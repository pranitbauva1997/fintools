import { formatAsINR, truncateToInteger } from '../lib/index';
import { calculateEMI } from '../lib/emi';
import { createStore } from 'solid-js/store';
import { InputWithRange } from './InputWithRange';
import { For } from 'solid-js';
import { Cluster, Stack } from '@xypnox/xip-ui';
import styles from '../style/calc.module.css';


const homeLoanConfig = {
  loanAmountInitial: 1000000,
  loanAmountMin: 1000000,
  loanAmountMax: 100000000,

  absoluteInterestRateMax: 25,

  timePeriodInYearsInitial: 10,
  timePeriodInYearsMax: 30,
}

type CalculatorConfig = typeof homeLoanConfig;


export default function EMICalculator(props: CalculatorConfig) {

  // const [emi, setEmi] = useState(0);
  // const [emiTable, setEmiTable] = useState(new Map());
  // const [totalPresentValueOfAllEmis, setTotalPresentValueOfAllEmis] = useState(0);
  // const [totalAbsoluteAmountRepaid, setTotalAbsoluteAmountRepaid] = useState(0);
  // const [totalAbsoluteInterestPaid, setTotalAbsoluteInterestPaid] = useState(0);

  const [calcStore, setCalcStore] = createStore({
    loanAmount: props.loanAmountInitial,
    absoluteInterestRate: 10,
    timePeriod: props.timePeriodInYearsInitial,
    inflationRate: 4,
  });


  // useEffect(() => {
  //   const [emi, emiTable, totalPresentValueOfAllEmis] = calculateEMI(
  //     loanAmount,
  //     absoluteInterestRate,
  //     inflationRate,
  //     timePeriodInYears
  //   );

  //   setEmi(emi);
  //   setEmiTable(emiTable);
  //   setTotalPresentValueOfAllEmis(totalPresentValueOfAllEmis);

  //   const calculatedTotalAbsoluteAmountRepaid = emi * timePeriodInYears * 12;
  //   setTotalAbsoluteAmountRepaid(calculatedTotalAbsoluteAmountRepaid);

  //   const calculatedTotalAbsoluteInterestPaid = calculatedTotalAbsoluteAmountRepaid - loanAmount;
  //   setTotalAbsoluteInterestPaid(calculatedTotalAbsoluteInterestPaid);

  // }, [loanAmount, absoluteInterestRate, timePeriodInYears, inflationRate]);
  //
  const calculated = () => {
    const val = calculateEMI(
      calcStore.loanAmount,
      calcStore.absoluteInterestRate,
      calcStore.inflationRate,
      calcStore.timePeriod
    )
    return {
      emi: val[0],
      table: val[1],
      totalPresentValueOfAllEmis: val[2],
    }
  }

  const totalAbsoluteAmountRepaid = () => calculated().emi * calcStore.timePeriod * 12

  const totalAbsoluteInterestPaid = () => totalAbsoluteAmountRepaid() - calcStore.loanAmount

  return (
    <>
      <Cluster class={styles.calc}>
        <div class={styles.input}>
          <InputWithRange
            label='Loan Amount'
            id='loan_amount'
            value={calcStore.loanAmount}
            unit='₹'
            range={{
              min: props.loanAmountMin,
              max: props.loanAmountMax,
              step: (props.loanAmountMax - props.loanAmountMin) / 100
            }}
            onChange={(n) => setCalcStore('loanAmount', n)}
          />

          <InputWithRange
            label='Interest Rate per year'
            id='absolute_interest_rate'
            value={calcStore.absoluteInterestRate}
            unit='%'
            range={{
              min: 1,
              max: props.absoluteInterestRateMax,
              step: props.absoluteInterestRateMax / 100
            }}
            onChange={(n) => setCalcStore('absoluteInterestRate', n)}
          />

          <InputWithRange
            label='Time Period'
            id='time_period_in_years'
            value={calcStore.timePeriod}
            unit='Yrs'
            range={{
              min: 1,
              max: props.timePeriodInYearsMax,
              step: 1
            }}
            onChange={(n) => setCalcStore('timePeriod', n)}
          />

          <InputWithRange
            label='Inflation Rate'
            id='inflation_rate'
            value={calcStore.inflationRate}
            unit='%'
            range={{
              min: 1,
              max: 100,
              step: 1
            }}
            onChange={(n) => setCalcStore('inflationRate', n)}
          />
        </div>

        <div class={styles.output}>
          <table class="emi-table">
            <tbody>
              <tr>
                <td>Loan EMI</td>
                <td>{formatAsINR(calculated().emi)}</td>
              </tr>
              <tr>
                <td>Total Amount Repaid</td>
                <td>{formatAsINR(totalAbsoluteAmountRepaid())}</td>
              </tr>
              <tr>
                <td>Total Interest Paid</td>
                <td>{formatAsINR(totalAbsoluteInterestPaid())}</td>
              </tr>
              <tr>
                <td>Total Real Amount Repaid</td>
                <td>{formatAsINR(calculated().totalPresentValueOfAllEmis)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Cluster>
      <Stack class={styles['output-stack']}>
        <table class="emi-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Interest</th>
              <th>Principal</th>
              <th>Total</th>
              <th>Present Value of EMI</th>
              <th>Outstanding Amount</th>
              <th>% of loan paid</th>
            </tr>
          </thead>
          <tbody>
            <For each={Array.from(calculated().table)}>
              {([date, data], index) => (
                <tr>
                  <td>{date.toLocaleDateString()}</td>
                  <td>{formatAsINR(data.interest_component)}</td>
                  <td>{formatAsINR(data.principal_component)}</td>
                  <td>{formatAsINR(data.total_payment)}</td>
                  <td>{formatAsINR(data.present_value_of_emi)}</td>
                  <td>{formatAsINR(data.outstanding_amount)}</td>
                  <td>{truncateToInteger(data.percentage_of_loan_paid)}%</td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </Stack>
      <Stack class={styles.explanation}>
        <h2>What is EMI?</h2>
        <p><b>Equated Monthly Installment</b> - EMI for short - is the amount payable every month to the bank or any other financial institution until the loan amount is fully paid off. It consists of the interest on loan as well as part of the principal amount to be repaid. The sum of principal amount and interest is divided by the tenure, i.e., number of months, in which the loan has to be repaid. This amount has to be paid monthly. The interest component of the EMI would be larger during the initial months and gradually reduce with each payment. The exact percentage allocated towards payment of the principal depends on the interest rate. Even though your monthly EMI payment won't change, the proportion of principal and interest components will change with time. With each successive payment, you'll pay more towards the principal and less in interest.</p>
        <p>Here's the formula to calculate EMI:</p>
        <img src="/emiformula.png" alt="Formula for EMI calculation" />
        <p>where</p>
        <p><b>E</b> is EMI</p>
        <p><b>P</b> is Principal Loan Amount</p>
        <p><b>r</b> is rate of interest calculated on monthly basis</p>
        <p><b>n</b> is loan term/tenure/duration in number of months</p>
      </Stack>
    </>
  );
}
