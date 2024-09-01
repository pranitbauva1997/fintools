import { createStore } from 'solid-js/store';
import { calculateRealReturn, formatAsINR } from '../../lib/index';
import { calculateLumpsumCompounding } from '../../lib/lumpsum';
import { Stack, Cluster } from '@xypnox/xip-ui';

import styles from '../../style/calc.module.css';
import { InputWithRange } from '~/components/InputWithRange';
import { SEO } from '~/components/seo';

export default function Lumpsum() {

  const [calcStore, setCalcStore] = createStore({
    initialInvestment: 10000,
    absoluteCompoundingRate: 10,
    timePeriod: 5,
    inflationRate: 6,
    expensesIncurred: 0.0,
  });


  const absoluteCompoundingRateAfterExpenses = () => calcStore.absoluteCompoundingRate - calcStore.expensesIncurred;

  const absoluteValue = () => calculateLumpsumCompounding(
    calcStore.initialInvestment,
    absoluteCompoundingRateAfterExpenses(),
    calcStore.timePeriod
  );

  const absoluteInterestEarned = () => absoluteValue() - calcStore.initialInvestment;

  const realCompoundingRate = () => calculateRealReturn(calcStore.absoluteCompoundingRate, calcStore.inflationRate);

  const realCompoundingRateAfterExpenses = () => realCompoundingRate() - calcStore.expensesIncurred;

  const realValue = () => calculateLumpsumCompounding(
    calcStore.initialInvestment,
    realCompoundingRateAfterExpenses(),
    calcStore.timePeriod
  );

  const postTaxValue = () => (absoluteInterestEarned() * 0.9) + calcStore.initialInvestment;


  const seoData = {
    title: "Lumpsum Calculator | Financial Tools & Calculators",
    description: "Calculate your Lumpsum returns with our easy-to-use Lumpsum calculator.",
    keywords: ["Lumpsum calculator", "investment calculator", "compound interest", "financial planning", "wealth growth", "mutual funds", "investment returns", "monthly investment", "index funds", "active funds", "passive funds"],
    url: "https://fintools.bauva.com/lumpsum"
  };

  return (
    <Stack>
      <SEO {...seoData} />

      <h1 class="title">Lumpsum Calculator</h1>
      <Cluster class={styles.calc}>
        <Stack class={styles.input}>
          <InputWithRange
            label="Initial Investment"
            id="initial_investment"
            unit="₹"
            value={calcStore.initialInvestment}
            onChange={(n) => setCalcStore('initialInvestment', n)}
            range={{
              min: 10000,
              max: 1000000,
              step: 10000
            }}
          />

          <InputWithRange
            label="Compounding Rate per year"
            id="absolute_compounding_rate"
            unit="%"
            value={calcStore.absoluteCompoundingRate}
            onChange={(n) => setCalcStore('absoluteCompoundingRate', n)}
            range={{
              min: 1,
              max: 100,
              step: 1
            }}
          />

          <InputWithRange
            label="Time Period"
            id="time_period"
            unit="Yrs"
            value={calcStore.timePeriod}
            onChange={(n) => setCalcStore('timePeriod', n)}
            range={{
              min: 1,
              max: 100,
              step: 1
            }}
          />

          <InputWithRange
            label="Inflation"
            id="inflation_rate"
            unit="%"
            value={calcStore.inflationRate}
            onChange={(n) => setCalcStore('inflationRate', n)}
            range={{
              min: 1,
              max: 100,
              step: 1
            }}
          />

          <InputWithRange
            label="Expenses Incurred"
            id="expenses_incurred"
            unit="%"
            value={calcStore.expensesIncurred}
            onChange={(n) => setCalcStore('expensesIncurred', n)}
            range={{
              min: 0,
              max: 10,
              step: 0.1
            }}
          />

        </Stack>
        <Stack class={styles.output}>
          <table class="emi-table">
            <tbody>
              <tr>
                <th colSpan={2}>Investment value</th>
              </tr>
              <tr>
                <td>after {calcStore.timePeriod} yrs</td>
                <td>{formatAsINR(absoluteValue())}</td>
              </tr>
              <tr>
                <td>after 10% LTCG</td>
                <td>{formatAsINR(postTaxValue())}</td>
              </tr>
              <tr>
                <td>after considering inflation before taxes</td>
                <td>{formatAsINR(realValue())}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Interest Earned is</td>
                <td>{formatAsINR(absoluteInterestEarned())}</td>
              </tr>
            </tbody>
          </table>
        </Stack>
      </Cluster>
      <Stack class={styles.explanation}>
        <h2>What is lumpsum investment?</h2>
        <p>A lumpsum investment is a type of investment where an investor puts a large amount of money into a financial asset, such as mutual funds, stocks, or bonds, all at once, instead of spreading it out over time. This approach contrasts with systematic investment plans (SIPs), where smaller amounts are invested regularly over a period of time. Some important things to note about lumpsum investments:</p>
        <ul>
          <li><b>Single Transaction</b>: The entire investment amount is invested in one go, making it straightforward and easy to manage.</li>
          <li><b>Market Timing</b>: The success of a lumpsum investment can be significantly influenced by the timing of the investment. If you invest during a market dip, your investment might grow rapidly as the market recovers. Conversely, investing at a market peak might result in lower returns or even losses in the short term.</li>
          <li><b>Risk and Reward</b>: Lumpsum investments carry a higher risk because the entire amount is exposed to market volatility from the moment it's invested. However, if the market performs well after the investment, the potential rewards can be substantial.</li>
          <li><b>Compounding</b>: A lumpsum investment can benefit from the power of compounding over time. The returns generated from the initial investment can be reinvested, leading to exponential growth.</li>
          <li><b>Investor Profile</b>: Lumpsum investments are often favored by investors who have a large amount of money available, such as from a bonus, inheritance, or the sale of an asset. It is also suitable for investors who are confident in their market timing and have a higher risk tolerance.</li>
        </ul>
      </Stack>
    </Stack>
  );
}
