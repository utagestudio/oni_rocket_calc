import {useContext} from 'react'
import {AmountContext} from '@/provider/AmountProvider'
import useModules from '@/hooks/useModules'

function useAmount() {
  const {thruster, findItem} = useModules()
  const amount = useContext<tAmountContext>(AmountContext)
  const STEP = 900
  const fuelTank = findItem("Fuel Tank")
  const MASS_INCREASE_PER_STEP_KG = fuelTank!.mass

  const amountCalculate = ({head, engine, thruster: _t, modules, oxidizerType, distance}:tAmount) => {
    amount.methods.setIsCalculating(true)

    const isSteam: boolean = engine.name === "Steam Engine"
    // 目標距離[km]
    const TargetRange = distance;
    // 空虚重量[kg]
    const W0  = head.mass + engine.mass + thruster.reduce((mass, t) => { return mass + t.mass}, 0) + modules.reduce((mass, t) => { return mass + t.mass}, 0)
    // 燃料効率[km/kg]
    const eta = engine.efficiency * (isSteam || oxidizerType === "solid" ? 1 : 1.33)

    const res = minimalFuelWithOxidizerPenaltyScaledInside(TargetRange, W0, eta, isSteam);
    if (res.feasible) {
      amount.methods.setAmount(res.fuelKg)
      amount.methods.setIsCalculating(false)
      console.log(`必要最小燃料: ${res.fuelKg} kg（k=${res.fSegment}）`);
    } else {
      console.log(`到達不可: ${res.reason}`);
    }
    return res
  }

  const minimalFuelWithOxidizerPenaltyScaledInside = (
    targetKm: number,              // TargetRange
    dryMassKg: number,             // W0
    efficiencyKmPerKg: number,     // η
    isSteam: boolean               // Steam Engin なら true
  ): tFeasible => {
    const OxidizerTankMass = isSteam ? 0 : 100
    const TargetRange = Math.max(0, targetKm);
    const W0 = Math.max(0, dryMassKg + OxidizerTankMass);
    const eta = Math.max(0, efficiencyKmPerKg);
    const dW = isSteam ? 0 : Math.max(0, MASS_INCREASE_PER_STEP_KG);
    const S = Math.max(1, Math.floor(STEP));

    const values =  {W0, dW, eta, TargetRange, isSteam}

    // ピーク定数: (Wk + 2f)/300 = C
    const penaltyDerivativeCoeff = isSteam ? 3.2 : 6.4;
    const C = Math.pow((eta * 300) / penaltyDerivativeCoeff, 1 / 2.2);

    // セグメント k=1: [1, S], k=2: [S+1, 2S], ...
    const max_loop = isSteam ? 1 : 3
    for (let k = 1; k <= max_loop; k++) {
      const start = (k - 1) * S + 1;
      const end = k * S;

      // 連続ピーク位置（理論値）
      const Wk = W0 + dW * k + OxidizerTankMass;
      const effectiveFuelMassMultiplier = isSteam ? 1 : 2
      const fPeakCont = (300 * C - Wk) / effectiveFuelMassMultiplier;

      // セグメント内の存在判定（単調性に基づく）
      let mayHavePositive = false;
      if (fPeakCont < start) {
        const gStart = g(start, values);
        if (gStart) {
          mayHavePositive = true;
        } else {
          // ピークが左に過ぎ、開始点も非正 → 以降不可能（Wk は k とともに増え不利）
          return { feasible: false, reason: "全セグメントで到達不可（ピーク通過済み）" };
        }
      } else if (fPeakCont > end) {
        if (g(end, values)) mayHavePositive = true;
      } else {
        const c1 = Math.max(start, Math.floor(fPeakCont));
        const c2 = Math.min(end, Math.ceil(fPeakCont));
        if (g(c1, values) || g(c2, values)) mayHavePositive = true;
      }

      if (!mayHavePositive) continue;

      // このセグメントで g(f) > 0 となる最小 f を二分探索
      // 増加区間は start..min(fPeakCont, end)
      const rightMono = Math.min(end, Math.floor(Math.max(start, Math.min(fPeakCont, end))));
      let lo = start - 1; // g(lo) <= 0 を期待
      let hi: number;

      if (fPeakCont <= start) {
        // 単調減少だが g(start) > 0 が保証されている
        hi = start;
      } else if (fPeakCont >= end) {
        // 単調増加（end が正）
        hi = end;
      } else {
        // ピークが区間内 → 増加区間の右端まで
        hi = rightMono;
        if (!g(hi, values)) {
          // 数値保険
          let h = hi + 1;
          while (h <= end && !g(h, values)) h++;
          if (h > end) continue;
          hi = h;
        }
      }

      // 整数二分探索（lo: 非正, hi: 正）
      while (lo + 1 < hi) {
        const mid = Math.floor((lo + hi) >> 1);
        if (g(mid, values)) hi = mid;
        else lo = mid;
      }
      // 前詰め（安全）
      if (g(lo, values)) hi = lo;
      let ans = hi;
      while (ans - 1 >= start && g(ans - 1, values)) ans--;

      return { feasible: true, fuelKg: ans, fSegment: k, oSegment: isSteam ? 0 : 1 };
    }

    return { feasible: false, reason: "探索上限を超過（パラメータ異常の可能性）" };
  }

  // 段数: f=0 → 0、>0 → ceil(f/S)
  const stepCount = (f: number) => (f <= 0 ? 0 : Math.ceil(f / STEP))

  // g(f) = η f − ((Wk + 2f)/300)^3.2 − T, where Wk = W0 + ΔW·k
  // 到達可否。 true なら到達可能
  const g = (f: number, values: {W0: number, dW: number, eta: number, TargetRange: number, isSteam: boolean}) => {
    const {W0, dW, eta, TargetRange, isSteam} = values;

    const k = stepCount(f);
    const Wk = W0 + dW * k;
    const f_value = isSteam ? f : f * 2; // Steam Engineならf単体。それ以外は、同量の酸化剤を追加
    const thruster_wet_mass = thruster.length * 800;
    const total_mass = Wk + f_value + thruster_wet_mass;
    const penalty = Math.max(total_mass, Math.pow(total_mass / 300, 3.2));
    // console.log(`k: ${k}, Wk: ${Wk}, f: ${f}, f_value: ${f_value}, penalty: ${penalty}, range: ${eta * f - penalty}, T: ${TargetRange}`);
    return eta * f - penalty > TargetRange - 12_000 * thruster.length;
  };

  return {
    amount: amount.amount,
    isCalculating: amount.isCalculating,
    amountCalculate,
    setIsCalculating: amount.methods.setIsCalculating
  }
}

export default useAmount
