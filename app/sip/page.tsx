"use client";

import Head from "next/head";
import '../../styles/main.css';
import Link from "next/link";
import { useState, useEffect } from "react";
import { formatAsINR, calculateRealReturn } from '../../lib/index';
import { calculateMonthlySIPAmounts, calculateSIPCompounding } from '../../lib/sip';

export default function SIP() {
  const seoData = {
    title: "SIP Calculator | Financial Tools & Calculators",
    description: "Calculate your Systematic Investment Plan (SIP) returns with our easy-to-use SIP calculator.",
    keywords: ["SIP calculator", "Systematic Investment Plan", "investment calculator", "compound interest", "financial planning", "wealth growth", "mutual funds", "investment returns", "monthly investment", "index funds", "active funds", "passive funds"],
    url: "https://fintools.bauva.com/sip"
  };
  useEffect(() => {
    document.title = seoData.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', seoData.description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', seoData.url);
    document.querySelector('meta[property="twitter:url"]')?.setAttribute('content', seoData.url);
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', seoData.keywords.join(', '));
  }, []);

  const [initialMonthlyInvestment, setInitialMonthlyInvestment] = useState(10000);
  const [absoluteCompoundingRate, setAbsoluteCompoundingRate] = useState(1);
  const [timePeriodInYears, setTimePeriodInYears] = useState(1);
  const [annualIncreaseInMonthlyInvestment, setAnnualIncreaseInMonthlyInvestment] = useState(1000);
  const [annualIncreaseStoppedAfterInYears, setAnnualIncreaseStoppedAfterInYears] = useState(30);
  const [inflationRateInPercentage, setInflationRateInPercentage] = useState(0);
  const [expensesIncurredInPercentage, setExpensesIncurredInPercentage] = useState(0.0);

  const [calculatedValues, setCalculatedValues] = useState<{
    absoluteCompoundingRateAfterExpenses: number,
    sipMonthlyValues: number[],
    lastMonthlySip: number,
    lastMonthlySipFormatted: string,
    investedAmount: number,
    investedAmountFormatted: string,
    absoluteValue: number,
    absoluteValueFormatted: string,
    absoluteInterestEarned: number,
    absoluteInterestEarnedFormatted: string,
    realCompoundingRate: number,
    realCompoundingRateAfterExpenses: number,
    realValue: number,
    realValueFormatted: string,
    postTaxValue: number,
    postTaxValueFormatted: string
  }>({
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
    <>
      <div className="container">
        <h1 className="title">SIP Calculator</h1>
        <nav className="navigation">
          <Link href="/sip"><button className="nav-active">SIP</button></Link>
          <Link href="/lumpsum"><button>Lumpsum</button></Link>
          <Link href="/emi"><button>EMI</button></Link>
        </nav>
        <div className="input">
          <div className="input-same-line">
            <label htmlFor="initial_monthly_investment">Initial Monthly Investment</label>
            <div className="input-group">
              <input 
                type="number" 
                id="initial_monthly_investment"
                value={initialMonthlyInvestment}
                onChange={(e) => setInitialMonthlyInvestment(Number(e.target.value))}
                placeholder=""
              />
              <div className="input-group-append">
                <span className="input-group-text">₹</span>
              </div>
            </div>
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
            <label htmlFor="absolute_compounding_rate_in_percentage">Compounding Rate per year</label>
            <div className="input-group">
              <input 
                type="number" 
                id="absolute_compounding_rate_in_percentage" 
                value={absoluteCompoundingRate}
                onChange={(e) => setAbsoluteCompoundingRate(Number(e.target.value))}
                placeholder=""
              />
              <div className="input-group-append">
                <span className="input-group-text">%</span>
              </div>
            </div>
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
            <label htmlFor="time_period_in_years">Time Period</label>
            <div className="input-group">
              <input
                type="number"
                value={timePeriodInYears}
                onChange={(e) => setTimePeriodInYears(Number(e.target.value))}
                id="time_period_in_years"
                placeholder=""
              />
              <div className="input-group-append">
                <span className="input-group-text">Yrs</span>
              </div>
            </div>
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
            <div className="input-group">
              <input 
                type="number" 
                id="annual_increase_in_monthly_investment" 
                value={annualIncreaseInMonthlyInvestment}
                onChange={(e) => setAnnualIncreaseInMonthlyInvestment(Number(e.target.value))}
                placeholder=""
              />
              <div className="input-group-append">
                <span className="input-group-text">₹</span>
              </div>
            </div>
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
            <label htmlFor="annual_increase_stopped_after_in_years">After how many years, do you stop annual increases in monthly SIP?</label>
            <div className="input-group">
              <input
                type="number"
                value={annualIncreaseStoppedAfterInYears}
                onChange={(e) => setAnnualIncreaseStoppedAfterInYears(Number(e.target.value))}
                id="annual_increase_stopped_after_in_years"
                placeholder=""
              />
              <div className="input-group-append">
                <span className="input-group-text">Yrs</span>
              </div>
            </div>
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
            <label htmlFor="inflation_rate_in_percentage">Inflation</label>
            <div className="input-group">
              <input 
                type="number" 
                id="inflation_rate_in_percentage" 
                value={inflationRateInPercentage}
                onChange={(e) => setInflationRateInPercentage(Number(e.target.value))}
                placeholder=""
              />
              <div className="input-group-append">
                <span className="input-group-text">%</span>
              </div>
            </div>
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
            <label htmlFor="expenses_incurred_in_percentage">Expenses Incurred every year</label>
            <div className="input-group">
              <input 
                type="number" 
                id="expenses_incurred_in_percentage" 
                value={expensesIncurredInPercentage}
                onChange={(e) => setExpensesIncurredInPercentage(Number(e.target.value))}
                placeholder=""
              />
              <div className="input-group-append">
                <span className="input-group-text">%</span>
              </div>
            </div>
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
          <table className="emi-table">
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
      </div>
    </>
  )
}