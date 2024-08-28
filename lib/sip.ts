export function calculateMonthlySIPAmounts(initial_sip: number, time_period: number, annual_increment: number, increments_stop_after_in_years: number): number[] {
  let sips = Array(0);
  let incremented_sip = initial_sip;
  for (let i = 0; i < time_period; i++) {
    if (i > 0 && (increments_stop_after_in_years === 0 || i < increments_stop_after_in_years)) {
      incremented_sip = incremented_sip + annual_increment;
    }
    sips = sips.concat(Array(12.0).fill(incremented_sip));
  }
  return sips;
}

export function calculateSIPCompounding(sips: number[], rate_in_years_in_percentage: number): number {
  const rate_in_months = rate_in_years_in_percentage / (12.0 * 100.0);
  let final_amount = 0.0;
  let l = sips.length
  for (let i = 0; i < l; i++) {
    final_amount += sips[i] * Math.pow(1 + rate_in_months, l - i);
  }
  return final_amount;
}