type tFeasible =
  | { feasible: true; fuelKg: number; fSegment: number; oSegment: number }
  | { feasible: false; reason: string };
