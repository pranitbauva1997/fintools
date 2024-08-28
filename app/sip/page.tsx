"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { handleAmountInput, formatAsINR, calculateRealReturn } from '../../lib/index';
import { calculateMonthlySIPAmounts, calculateSIPCompounding } from '../../lib/sip';

export default function SIP() {
  const [initialMonthlyInvestment, setInitialMonthlyInvestment] = useState(10000);
  const [absoluteCompoundingRate, setAbsoluteCompoundingRate] = useState(1);
  const [timePeriodInYears, setTimePeriodInYears] = useState(1);
  const [annualIncreaseInMonthlyInvestment, setAnnualIncreaseInMonthlyInvestment] = useState(5000);
  const [annualIncreaseStoppedAfterInYears, setAnnualIncreaseStoppedAfterInYears] = useState(0);
  const [inflationRateInPercentage, setInflationRateInPercentage] = useState(0);
  const [expensesIncurredInPercentage, setExpensesIncurredInPercentage] = useState(0.0);

  const [calculatedValues, setCalculatedValues] = useState({
    absoluteCompoundingRateAfterExpenses: 0,
    sipMonthlyValues: [],
    lastMonthlySip: 0,
    lastMonthlySipFormatted: '',
    investedAmount: 0,
    investedAmountFormatted: '',
    absoluteValue: 0,
    absoluteValueFormatted: '',
    absoluteInterestEarned: 0,
    absoluteInterestEarnedFormatted: '',
    realCompoundingRate: 0,
    realCompoundingRateAfterExpenses: 0,
    realValue: 0,
    realValueFormatted: '',
    postTaxValue: 0,
    postTaxValueFormatted: ''
  });

  useEffect(() => {
    const absoluteCompoundingRateAfterExpenses = absoluteCompoundingRate - expensesIncurredInPercentage;
    const sipMonthlyValues = calculateMonthlySIPAmounts(initialMonthlyInvestment, timePeriodInYears, annualIncreaseInMonthlyInvestment, annualIncreaseStoppedAfterInYears);
    const lastMonthlySip = sipMonthlyValues[sipMonthlyValues.length - 1];
    const investedAmount = sipMonthlyValues.reduce((partialSum, a) => partialSum + a, 0);
    const absoluteValue = calculateSIPCompounding(sipMonthlyValues, absoluteCompoundingRateAfterExpenses);
    const absoluteInterestEarned = absoluteValue - investedAmount;
    const realCompoundingRate = calculateRealReturn(absoluteCompoundingRate, inflationRateInPercentage);
    const realCompoundingRateAfterExpenses = realCompoundingRate - expensesIncurredInPercentage;
    const realValue = calculateSIPCompounding(sipMonthlyValues, realCompoundingRateAfterExpenses);
    const postTaxValue = (absoluteInterestEarned * 0.9) + investedAmount;

    setCalculatedValues({
      absoluteCompoundingRateAfterExpenses,
      sipMonthlyValues,
      lastMonthlySip,
      lastMonthlySipFormatted: formatAsINR(lastMonthlySip),
      investedAmount,
      investedAmountFormatted: formatAsINR(investedAmount),
      absoluteValue,
      absoluteValueFormatted: formatAsINR(absoluteValue),
      absoluteInterestEarned,
      absoluteInterestEarnedFormatted: formatAsINR(absoluteInterestEarned),
      realCompoundingRate,
      realCompoundingRateAfterExpenses,
      realValue,
      realValueFormatted: formatAsINR(realValue),
      postTaxValue,
      postTaxValueFormatted: formatAsINR(postTaxValue)
    });
  }, [initialMonthlyInvestment, absoluteCompoundingRate, timePeriodInYears, annualIncreaseInMonthlyInvestment, annualIncreaseStoppedAfterInYears, inflationRateInPercentage, expensesIncurredInPercentage]);

  return (
    <div className="container">
      <h1>SIP Calculator</h1>
      <p><Link href="/">Home</Link></p>
      <div className="input">
        <div className="input-same-line">
          <label htmlFor="initial_monthly_investment">Initial Monthly Investment</label>
          <input 
            type="text" 
            id="initial_monthly_investment"
            value={formatAsINR(initialMonthlyInvestment)}
            onChange={(e) => setInitialMonthlyInvestment(handleAmountInput(e.target.value))}
            placeholder=""
          />
        </div>
        <input
          type="range"
          value={initialMonthlyInvestment}
          onChange={(e) => setInitialMonthlyInvestment(Number(e.target.value))}
          id="initial_monthly_investment"
          min="10000"
          max="1000000"
          step="10000"
        />

        <div className="input-same-line">
          <label htmlFor="absolute_compounding_rate_in_percentage">Absolute Compounding Rate (in percentage per year)</label>
          <input 
            type="text" 
            id="absolute_compounding_rate_in_percentage" 
            value={`${absoluteCompoundingRate} %`}
            onChange={(e) => setAbsoluteCompoundingRate(Number(e.target.value.replace(' %', '')))}
            placeholder=""
          />
        </div>
        <input
          type="range"
          value={absoluteCompoundingRate}
          onChange={(e) => setAbsoluteCompoundingRate(Number(e.target.value))}
          id="absolute_compounding_rate_in_percentage"
          min="1"
          max="100"
          step="1"
        />

        <div className="input-same-line">
          <label htmlFor="time_period_in_years">Time Period (in years)</label>
          <input
            type="number"
            value={timePeriodInYears}
            onChange={(e) => setTimePeriodInYears(Number(e.target.value))}
            id="time_period_in_years"
            placeholder=""
          />
        </div>
        <input
          type="range"
          value={timePeriodInYears}
          onChange={(e) => setTimePeriodInYears(Number(e.target.value))}
          id="time_period_in_years"
          min="1"
          max="100"
          step="1"
        />

        <div className="input-same-line">
          <label htmlFor="annual_increase_in_monthly_investment">How much can you increase your monthly SIP every year?</label>
          <input 
            type="text" 
            id="annual_increase_in_monthly_investment" 
            value={formatAsINR(annualIncreaseInMonthlyInvestment)}
            onChange={(e) => setAnnualIncreaseInMonthlyInvestment(handleAmountInput(e.target.value))}
            placeholder=""
          />
        </div>
        <input
          type="range"
          value={annualIncreaseInMonthlyInvestment}
          onChange={(e) => setAnnualIncreaseInMonthlyInvestment(Number(e.target.value))}
          id="annual_increase_in_monthly_investment"
          min="10000"
          max="1000000"
          step="10000"
        />

        <div className="input-same-line">
          <label htmlFor="annual_increase_stopped_after_in_years">After how many years, do you stop annual increases in monthly SIP? (0 means never stop)</label>
          <input
            type="number"
            value={annualIncreaseStoppedAfterInYears}
            onChange={(e) => setAnnualIncreaseStoppedAfterInYears(Number(e.target.value))}
            id="annual_increase_stopped_after_in_years"
            placeholder=""
          />
        </div>
        <input
          type="range"
          value={annualIncreaseStoppedAfterInYears}
          onChange={(e) => setAnnualIncreaseStoppedAfterInYears(Number(e.target.value))}
          id="annual_increase_stopped_after_in_years"
          min="0"
          max="100"
          step="1"
        />

        <div className="input-same-line">
          <label htmlFor="inflation_rate_in_percentage">Inflation (in percentage)</label>
          <input 
            type="text" 
            id="inflation_rate_in_percentage" 
            value={`${inflationRateInPercentage} %`}
            onChange={(e) => setInflationRateInPercentage(Number(e.target.value.replace(' %', '')))}
            placeholder=""
          />
        </div>
        <input
          type="range"
          value={inflationRateInPercentage}
          onChange={(e) => setInflationRateInPercentage(Number(e.target.value))}
          id="inflation_rate_in_percentage"
          min="1"
          max="100"
          step="1"
        />

        <div className="input-same-line">
          <label htmlFor="expenses_incurred_in_percentage">Expenses Incurred (in percentage per year)</label>
          <input 
            type="text" 
            id="expenses_incurred_in_percentage" 
            value={`${expensesIncurredInPercentage} %`}
            onChange={(e) => setExpensesIncurredInPercentage(Number(e.target.value.replace(' %', '')))}
            placeholder=""
          />
        </div>
        <input
          type="range"
          value={expensesIncurredInPercentage}
          onChange={(e) => setExpensesIncurredInPercentage(Number(e.target.value))}
          id="expenses_incurred_in_percentage"
          min="0"
          max="10"
          step="0.1"
        />
      </div>
      <div className="output">
        <table>
          <tbody>
            <tr>
              <td>Total invested amount is</td>
              <td>{calculatedValues.investedAmountFormatted}</td>
            </tr>
            <tr>
              <td>Last monthly SIP is</td>
              <td>{calculatedValues.lastMonthlySipFormatted}</td>
            </tr>
            <tr>
              <td>Investment Value after {timePeriodInYears} yrs is</td>
              <td>{calculatedValues.absoluteValueFormatted}</td>
            </tr>
            <tr>
              <td>Interest Earned is</td>
              <td>{calculatedValues.absoluteInterestEarnedFormatted}</td>
            </tr>
            <tr>
              <td>Investment value after considering inflation is</td>
              <td>{calculatedValues.realValueFormatted}</td>
            </tr>
            <tr>
              <td>Investment value after 10% LTCG is</td>
              <td>{calculatedValues.postTaxValueFormatted}</td>
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
  )
}