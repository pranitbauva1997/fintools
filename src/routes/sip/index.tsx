import { InputWithRange } from '~/components/InputWithRange';
import { formatAsINR, calculateRealReturn } from '../../lib/index';
import { calculateMonthlySIPAmounts, calculateSIPCompounding } from '../../lib/sip';
import { SEO } from "~/components/seo";
import { createStore } from 'solid-js/store';
import { Cluster, Stack } from '@xypnox/xip-ui';
import styles from '../../style/calc.module.css';

export default function SIP() {
  const seoData = {
    title: "SIP Calculator | Financial Tools & Calculators",
    description: "Calculate your Systematic Investment Plan (SIP) returns with our easy-to-use SIP calculator.",
    keywords: ["SIP calculator", "Systematic Investment Plan", "investment calculator", "compound interest", "financial planning", "wealth growth", "mutual funds", "investment returns", "monthly investment", "index funds", "active funds", "passive funds"],
    url: "https://fintools.bauva.com/sip"
  };

  const [calcStore, setCalcStore] = createStore({
    initialMonthlyInvestment: 10000,
    absoluteCompoundingRate: 10,
    annualIncreaseInMonthlyInvestment: 1000,
    annualIncreaseStoppedAfterInYears: 30,
    timePeriod: 5,
    inflationRate: 6,
    expensesIncurred: 0.0,
  });

  const absoluteCompoundingRateAfterExpenses = () => calcStore.absoluteCompoundingRate - calcStore.expensesIncurred;
  const sipMonthlyValues = () => calculateMonthlySIPAmounts(
    calcStore.initialMonthlyInvestment,
    calcStore.timePeriod,
    calcStore.annualIncreaseInMonthlyInvestment,
    calcStore.annualIncreaseStoppedAfterInYears
  );

  const investedAmount = () => sipMonthlyValues().reduce((partialSum, a) => partialSum + a, 0);
  const absoluteValue = () => calculateSIPCompounding(sipMonthlyValues(), absoluteCompoundingRateAfterExpenses());

  const absoluteInterestEarned = () => absoluteValue() - investedAmount();
  const realCompoundingRate = () => calculateRealReturn(calcStore.absoluteCompoundingRate, calcStore.inflationRate);
  const realCompoundingRateAfterExpenses = () => realCompoundingRate() - calcStore.expensesIncurred;
  const realValue = () => calculateSIPCompounding(sipMonthlyValues(), realCompoundingRateAfterExpenses());
  const postTaxValue = () => (absoluteInterestEarned() * 0.9) + investedAmount();

  return (
    <>
      <Stack>
        <SEO {...seoData} />
        <h1 class="title">SIP Calculator</h1>
        <Cluster class={styles.calc}>
          <div class={styles.input}>
            <InputWithRange
              label='Initial Montly Installment'
              id='initial_monthly_investment'
              value={calcStore.initialMonthlyInvestment}
              unit='₹'
              range={{
                min: 1000,
                max: 100000,
                step: 1000
              }}
              onChange={(n) => setCalcStore('initialMonthlyInvestment', n)}
            />

            <InputWithRange
              label='Compounding Rate per year'
              id='absolute_compounding_rate_in_percentage'
              value={calcStore.absoluteCompoundingRate}
              unit='%'
              range={{
                min: 1,
                max: 100,
                step: 1
              }}
              onChange={(n) => setCalcStore('absoluteCompoundingRate', n)}
            />

            <InputWithRange
              label='Time Period'
              id='time_period_in_years'
              value={calcStore.timePeriod}
              unit='Yrs'
              range={{
                min: 1,
                max: 100,
                step: 1
              }}
              onChange={(n) => setCalcStore('timePeriod', n)}
            />

            <InputWithRange
              label='Annual Increase in Monthly Investment'
              description='Increase in monthly SIP every year?'
              id='annual_increase_in_monthly_investment'
              value={calcStore.annualIncreaseInMonthlyInvestment}
              unit='₹'
              range={{
                min: 1000,
                max: 100000,
                step: 1000
              }}
              onChange={(n) => setCalcStore('annualIncreaseInMonthlyInvestment', n)}
            />

            <InputWithRange
              label='Annual Increase Stopped After'
              description='Increase in SIP stops after?'
              id='annual_increase_stopped_after_in_years'
              value={calcStore.annualIncreaseStoppedAfterInYears}
              unit='Yrs'
              range={{
                min: 0,
                max: 100,
                step: 1
              }}
              onChange={(n) => setCalcStore('annualIncreaseStoppedAfterInYears', n)}
            />

            <InputWithRange
              label='Inflation Rate'
              id='inflation_rate_in_percentage'
              value={calcStore.inflationRate}
              unit='%'
              range={{
                min: 1,
                max: 100,
                step: 1
              }}
              onChange={(n) => setCalcStore('inflationRate', n)}
            />

            <InputWithRange
              label='Expenses Incurred every year'
              id='expenses_incurred_in_percentage'
              value={calcStore.expensesIncurred}
              unit='%'
              range={{
                min: 0,
                max: 10,
                step: 0.1
              }}
              onChange={(n) => setCalcStore('expensesIncurred', n)}
            />
          </div>

          <Stack class={styles.output}>
            <table class="emi-table">
              <tbody>
                <tr>
                  <td>Total invested amount is</td>
                  <td>{formatAsINR(investedAmount())}</td>
                </tr>
                <tr>
                  <td>Last monthly SIP is</td>
                  <td>{formatAsINR(sipMonthlyValues()[sipMonthlyValues().length - 1])}</td>
                </tr>
                <tr>
                  <td>Investment Value after {calcStore.timePeriod} yrs is</td>
                  <td>{formatAsINR(absoluteValue())}</td>
                </tr>
                <tr>
                  <td>Interest Earned is</td>
                  <td>{formatAsINR(absoluteInterestEarned())}</td>
                </tr>
                <tr>
                  <td>Investment value after considering inflation is</td>
                  <td>{formatAsINR(realValue())}</td>
                </tr>
                <tr>
                  <td>Investment value after 10% LTCG is</td>
                  <td>{formatAsINR(postTaxValue())}</td>
                </tr>
              </tbody>
            </table>
          </Stack>
        </Cluster>

        <Stack class={styles.explanation}>
          <h2>What is SIP?</h2>
          <p>An SIP stands for <b>Systematic Investment Plan</b>. It is a method of investing a fixed amount of money at regular intervals (usually monthly) into a mutual fund. SIPs allow investors to accumulate wealth over time by consistently investing small amounts, regardless of market conditions. Here's how an SIP works:</p>
          <ol>
            <li><b>Regular Investments</b>: You choose an amount you want to invest regularly, like every month or quarter. This amount is automatically deducted from your bank account and invested in your chosen mutual fund.</li>
            <li><b>Cost Averaging</b>: Since you invest regularly regardless of the market conditions, you end up buying more units when prices are low and fewer units when prices are high. This averaging out of costs over time is known as Rupee Cost Averaging.</li>
            <li><b>Compounding Benefits</b>: The money you invest earns returns, and these returns are reinvested, allowing you to earn returns on your returns. Over time, this compounding effect can significantly increase your wealth.</li>
            <li><b>Discipline and Convenience</b>: SIPs promote disciplined investing by automating the process, making it easier to stick to an investment plan without worrying about market timing.</li>
          </ol>
          <p>SIPs are a useful tool for individuals to build a corpus/wealth over time, particularly for long-term goals like retirement, education or buying a house.</p>
        </Stack>

      </Stack>
    </>
  )
}
