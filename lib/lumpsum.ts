export function calculateLumpsumCompounding(initial_amount: number, rate_in_percentage: number, time_period: number): number {
  const rate = rate_in_percentage / 100.0;
  const final_amount = initial_amount * Math.pow(1 + rate, time_period);
  return Math.round(final_amount * 100.0) / 100.0;
}