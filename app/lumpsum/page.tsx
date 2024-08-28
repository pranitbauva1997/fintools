'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { handleAmountInput, calculateRealReturn, formatAsINR } from '../../lib/index';
import { calculateLumpsumCompounding } from '../../lib/lumpsum';

export default function Lumpsum() {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [absoluteCompoundingRate, setAbsoluteCompoundingRate] = useState(1);
  const [timePeriod, setTimePeriod] = useState(1);
  const [inflationRate, setInflationRate] = useState(0);
  const [expensesIncurred, setExpensesIncurred] = useState(0.0);

  const [absoluteCompoundingRateAfterExpenses, setAbsoluteCompoundingRateAfterExpenses] = useState(0);
  const [absoluteValue, setAbsoluteValue] = useState(0);
  const [absoluteValueFormatted, setAbsoluteValueFormatted] = useState('');
  const [absoluteInterestEarned, setAbsoluteInterestEarned] = useState(0);
  const [absoluteInterestEarnedFormatted, setAbsoluteInterestEarnedFormatted] = useState('');
  const [realCompoundingRate, setRealCompoundingRate] = useState(0);
  const [realCompoundingRateAfterExpenses, setRealCompoundingRateAfterExpenses] = useState(0);
  const [realValue, setRealValue] = useState(0);
  const [realValueFormatted, setRealValueFormatted] = useState('');
  const [postTaxValue, setPostTaxValue] = useState(0);
  const [postTaxValueFormatted, setPostTaxValueFormatted] = useState('');

  useEffect(() => {
    const absoluteCompoundingRateAfterExpenses = absoluteCompoundingRate - expensesIncurred;
    setAbsoluteCompoundingRateAfterExpenses(absoluteCompoundingRateAfterExpenses);

    const absoluteValue = calculateLumpsumCompounding(initialInvestment, absoluteCompoundingRateAfterExpenses, timePeriod);
    setAbsoluteValue(absoluteValue);
    setAbsoluteValueFormatted(formatAsINR(absoluteValue));

    const absoluteInterestEarned = absoluteValue - initialInvestment;
    setAbsoluteInterestEarned(absoluteInterestEarned);
    setAbsoluteInterestEarnedFormatted(formatAsINR(absoluteInterestEarned));

    const realCompoundingRate = calculateRealReturn(absoluteCompoundingRate, inflationRate);
    setRealCompoundingRate(realCompoundingRate);

    const realCompoundingRateAfterExpenses = realCompoundingRate - expensesIncurred;
    setRealCompoundingRateAfterExpenses(realCompoundingRateAfterExpenses);

    const realValue = calculateLumpsumCompounding(initialInvestment, realCompoundingRateAfterExpenses, timePeriod);
    setRealValue(realValue);
    setRealValueFormatted(formatAsINR(realValue));

    const postTaxValue = (absoluteInterestEarned * 0.9) + initialInvestment;
    setPostTaxValue(postTaxValue);
    setPostTaxValueFormatted(formatAsINR(postTaxValue));
  }, [initialInvestment, absoluteCompoundingRate, timePeriod, inflationRate, expensesIncurred]);

  return (
    <div className="container">
      <h1>SIP Calculator</h1>
      <p><Link href="/">Home</Link></p>
      <div className="input">
        <div className="input-same-line">
          <label htmlFor="initial_investment">Initial Investment</label>
          <input 
            type="text" 
            id="initial_investment" 
            value={formatAsINR(initialInvestment)}
            onChange={(e) => setInitialInvestment(handleAmountInput(e))}
            placeholder=""
          />
        </div>
        <input
          type="range"
          value={initialInvestment}
          onChange={(e) => setInitialInvestment(Number(e.target.value))}
          id="initial_investment"
          min="10000"
          max="1000000"
          step="10000"
        />

        <div className="input-same-line">
          <label htmlFor="absolute_compounding_rate">Absolute Compounding Rate (in percentage per year)</label>
          <input 
            type="text" 
            id="absolute_compounding_rate" 
            value={`${absoluteCompoundingRate} %`}
            readOnly
          />
        </div>
        <input
          type="range"
          value={absoluteCompoundingRate}
          onChange={(e) => setAbsoluteCompoundingRate(Number(e.target.value))}
          id="absolute_compounding_rate"
          min="1"
          max="100"
          step="1"
        />

        <div className="input-same-line">
          <label htmlFor="time_period">Time Period (in years)</label>
          <input
            type="number"
            value={timePeriod}
            onChange={(e) => setTimePeriod(Number(e.target.value))}
            id="time_period"
            placeholder=""
          />
        </div>
        <input
          type="range"
          value={timePeriod}
          onChange={(e) => setTimePeriod(Number(e.target.value))}
          id="time_period"
          min="1"
          max="100"
          step="1"
        />

        <div className="input-same-line">
          <label htmlFor="inflation_rate">Inflation (in percentage)</label>
          <input 
            type="text" 
            id="inflation_rate" 
            value={`${inflationRate} %`}
            readOnly
          />
        </div>
        <input
          type="range"
          value={inflationRate}
          onChange={(e) => setInflationRate(Number(e.target.value))}
          id="inflation_rate"
          min="1"
          max="100"
          step="1"
        />

        <div className="input-same-line">
          <label htmlFor="expenses_incurred">Expenses Incurred (in percentage per year)</label>
          <input 
            type="text" 
            id="expenses_incurred" 
            value={`${expensesIncurred} %`}
            readOnly
          />
        </div>
        <input
          type="range"
          value={expensesIncurred}
          onChange={(e) => setExpensesIncurred(Number(e.target.value))}
          id="expenses_incurred"
          min="0"
          max="10"
          step="0.1"
        />
      </div>
      <div className="output">
        <table>
          <tbody>
            <tr>
              <td>Investment Value after {timePeriod} yrs</td>
              <td>{absoluteValueFormatted}</td>
            </tr>
            <tr>
              <td>Interest Earned is</td>
              <td>{absoluteInterestEarnedFormatted}</td>
            </tr>
            <tr>
              <td>Investment value after 10% LTCG</td>
              <td>{postTaxValueFormatted}</td>
            </tr>
            <tr>
              <td>Investment value after considering inflation before taxes</td>
              <td>{realValueFormatted}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          width: 40%;
        }
        .input {
          display: flex;
          flex-direction: column;
        }
        .input-same-line {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
}
