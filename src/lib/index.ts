// place files you want to import through the `$lib` alias in this folder.

export function calculateRealReturn(absolute_return_rate_in_percentage: number, inflation_rate_in_percentage: number): number {
  return (((1 + (absolute_return_rate_in_percentage/100)) / (1 + (inflation_rate_in_percentage/100))) - 1)*100
}

export function formatAsINR(amount: number): string {
  return new Intl.NumberFormat('en-IN',
    {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }
  ).format(truncateToInteger(amount));
}


export function handleAmountInput(event: any) {
  const value = event.target.value.replace(/,/g, '');
  const loan_amount = parseInt(value, 10) || 0;
  event.target.value = formatAsINR(loan_amount);
}

export function truncateToInteger(value: number): number {
  return Math.trunc(value);
}