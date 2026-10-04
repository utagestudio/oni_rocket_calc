# ONI Rocket Fuel Calculator

日本語の説明は README の後半にあります。

An unofficial rocket fuel calculator for the Oxygen Not Included base game.

Select a rocket head, engine, modules, thrusters, oxidizer type, and target distance to calculate the required fuel amount, fuel tank count, and oxidizer tank count.

## Features

- Supports Steam, Petroleum, Biodiesel, and Hydrogen Engines.
- Accounts for Solid Fuel Thruster range bonuses.
- Applies the current efficiency difference between Solid Oxidizer and Liquid Oxygen.
- Calculates rocket mass from the selected head, engine, modules, tanks, and thrusters.
- Detects rocket configurations that cannot reach the selected destination.
- Keeps the core calculation logic independent from React UI code.

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Sass
- Node.js 24.14.1 via mise

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

This project should be run with the Node.js version pinned in `.mise.toml`:

```bash
mise install
mise exec -- npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm test
```

## Calculation Model

The core fuel calculation lives in:

```text
src/domain/rocketFuel.ts
```

The UI passes a plain rocket configuration into `calculateRocketFuel`, and the function returns either a feasible result with required fuel and tank counts, or an infeasible result with a reason.

Calculation tests are in:

```text
tests/rocketFuel.test.ts
```

When changing calculation behavior, update the tests in the same change.

## Project Structure

```text
src/app/                 Next.js App Router pages and layout
src/components/          UI components
src/components/Results/  Fuel and tank result display
src/domain/              Pure calculation logic
src/hooks/               React-facing state wrappers
src/provider/            Context providers
src/contents/data.json   Rocket parts data
tests/                   Calculation tests
public/assets/           Game-related UI images
```

## Contact

Bug reports, requests, and questions can be sent through the [contact form](https://tally.so/r/KYqY78?product=Rocket%20Fuel%20Calculator) (no account required).
If you have a GitHub account, [Issues](https://github.com/utagestudio/oni_rocket_calc/issues) works as well.

## Credits

Oxygen Not Included is developed by Klei Entertainment.

This project is an unofficial fan-made calculator.

---

# ONI ロケット燃料計算機

Oxygen Not Included の Base Game 向け非公式ロケット燃料計算ツールです。

ロケットのヘッド、エンジン、モジュール、スラスター、酸化剤タイプ、目的距離を選択すると、必要な燃料量、燃料タンク数、酸化剤タンク数を計算します。

## 機能

- Steam / Petroleum / Biodiesel / Hydrogen Engine に対応
- Solid Fuel Thruster の距離ボーナスを考慮
- Solid Oxidizer / Liquid Oxygen の効率差を反映
- 選択したヘッド、エンジン、モジュール、タンク、スラスターからロケット質量を計算
- 選択した目的地に到達できない構成を検出
- コア計算ロジックを React UI から独立した形で管理

## 技術スタック

- Next.js 15
- React 19
- TypeScript
- Sass
- mise 経由の Node.js 24.14.1

## 開発環境の起動

依存関係をインストールし、開発サーバーを起動します。

```bash
npm install
npm run dev
```

ブラウザで http://localhost:3000 を開いてください。

このプロジェクトでは `.mise.toml` に固定された Node.js バージョンを使用してください。

```bash
mise install
mise exec -- npm run dev
```

## スクリプト

```bash
npm run dev
npm run build
npm run start
npm test
```

## 計算モデル

燃料計算の中心となるロジックは次のファイルにあります。

```text
src/domain/rocketFuel.ts
```

UI は `calculateRocketFuel` にプレーンなロケット構成オブジェクトを渡し、関数は到達可能な場合は必要燃料量とタンク数を、到達不可の場合は理由を返します。

計算テストは次のファイルにあります。

```text
tests/rocketFuel.test.ts
```

計算結果の挙動を変更する場合は、同じ変更内でテストも更新してください。

## プロジェクト構成

```text
src/app/                 Next.js App Router のページとレイアウト
src/components/          UI コンポーネント
src/components/Results/  燃料量とタンク数の表示
src/domain/              純粋な計算ロジック
src/hooks/               React 向けの状態ラッパー
src/provider/            Context Provider
src/contents/data.json   ロケット部品データ
tests/                   計算テスト
public/assets/           ゲーム関連の UI 画像
```

## お問い合わせ

不具合の報告、要望、質問は[お問い合わせフォーム（英語）](https://tally.so/r/KYqY78?product=Rocket%20Fuel%20Calculator)から送れます（アカウント不要）。
GitHub のアカウントをお持ちなら、[Issues](https://github.com/utagestudio/oni_rocket_calc/issues) に書いていただいてもかまいません。

## クレジット

Oxygen Not Included は Klei Entertainment によって開発されています。

このプロジェクトは非公式のファンメイド計算ツールです。
