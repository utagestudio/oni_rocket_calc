type tFeasible =
  | { feasible: true; fuelKg: number; segment: number }
  | { feasible: false; reason: string };
