function getFirstOfNextMonthDate(date: Date): Date {
    const current_date = new Date(date);
    current_date.setDate(1);
    current_date.setMonth(current_date.getMonth() + 1);
    return current_date;
}

export function calculateEMI(
  loan_amount: number,
  absolute_interest_rate_in_percentage: number,
  inflation_in_percentage: number,
  time_period_in_years: number
): [number, Map<Date, {
  interest_component: number;
  principal_component: number;
  present_value_of_emi: number;
  total_payment: number;
  outstanding_amount: number;
  percentage_of_loan_paid: number;
  }>, number] {
  const rate_in_months = absolute_interest_rate_in_percentage / (12.0 * 100.0);
  const inflation_in_months = inflation_in_percentage / (12.0 * 100.0);
  const no_of_months = time_period_in_years * 12;
  const exponent = Math.pow(1 + rate_in_months, no_of_months);
  const emi = loan_amount * rate_in_months * exponent / (exponent - 1);

  const first_of_next_month_date = getFirstOfNextMonthDate(new Date());
  let iter_date = first_of_next_month_date;
  let outstanding_amount = loan_amount;
  let present_value_of_emi = 0;
  let total_present_value_of_all_emis = 0;
  const emi_table = new Map();
  for (let i = 0; i < no_of_months; i++) {
    const interest_component = outstanding_amount * rate_in_months;
    const principal_component = emi - interest_component;
    const exponent_inflation = Math.pow(1 + inflation_in_months, i);
    present_value_of_emi = emi / exponent_inflation;
    outstanding_amount -= principal_component;
    total_present_value_of_all_emis += present_value_of_emi;
    emi_table.set(iter_date, {
        interest_component: interest_component,
        principal_component: principal_component,
        present_value_of_emi: present_value_of_emi,
        total_payment: emi,
        outstanding_amount: outstanding_amount,
        percentage_of_loan_paid: (1 - outstanding_amount / loan_amount) * 100
    });
    iter_date = getFirstOfNextMonthDate(iter_date);
  }
  return [ emi, emi_table, total_present_value_of_all_emis ];
}