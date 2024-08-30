'use client';

import '../../styles/main.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { calculateRealReturn, formatAsINR } from '../../lib/index';
import { calculateLumpsumCompounding } from '../../lib/lumpsum';

export default function Lumpsum() {
  const seoData = {
    title: "Lumpsum Calculator | Financial Tools & Calculators",
    description: "Calculate your Lumpsum returns with our easy-to-use Lumpsum calculator.",
    keywords: ["Lumpsum calculator", "investment calculator", "compound interest", "financial planning", "wealth growth", "mutual funds", "investment returns", "monthly investment", "index funds", "active funds", "passive funds"],
    url: "https://fintools.bauva.com/lumpsum"
  };
  useEffect(() => {
    document.title = seoData.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', seoData.description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', seoData.url);
    document.querySelector('meta[property="twitter:url"]')?.setAttribute('content', seoData.url);
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', seoData.keywords.join(', '));
  }, []);

  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [absoluteCompoundingRate, setAbsoluteCompoundingRate] = useState(10);
  const [timePeriod, setTimePeriod] = useState(5);
  const [inflationRate, setInflationRate] = useState(6);
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
      <h1 className="title">Lumpsum Calculator</h1>
      <nav className="navigation">
        <Link href="/sip"><button>SIP</button></Link>
        <Link href="/lumpsum"><button className="nav-active">Lumpsum</button></Link>
        <Link href="/emi/home-loan"><button>EMI</button></Link>
      </nav>
      <div className="input">
        <div className="input-same-line">
          <label htmlFor="initial_investment">Initial Investment</label>
          <div className="input-group">
            <input 
              type="number" 
              id="initial_investment" 
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              placeholder=""
            />
            <div className="input-group-append">
              <span className="input-group-text">₹</span>
            </div>
          </div>
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
          <label htmlFor="absolute_compounding_rate">Compounding Rate per year</label>
          <div className="input-group">     
            <input 
              type="number" 
            id="absolute_compounding_rate" 
            onChange={(e) => setAbsoluteCompoundingRate(Number(e.target.value))}
            value={absoluteCompoundingRate}
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
          id="absolute_compounding_rate"
          min="1"
          max="100"
          step="1"
        />

        <div className="input-same-line">
          <label htmlFor="time_period">Time Period</label>
          <div className="input-group">
            <input
            type="number"
              value={timePeriod}
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              id="time_period"
              placeholder=""
            />
            <div className="input-group-append">
              <span className="input-group-text">Yrs</span>
            </div>
          </div>
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
          <label htmlFor="inflation_rate">Inflation</label>
          <div className="input-group">
            <input 
              type="number" 
              id="inflation_rate" 
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              placeholder=""
            />
            <div className="input-group-append">
              <span className="input-group-text">%</span>
            </div>
          </div>
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
          <label htmlFor="expenses_incurred">Expenses Incurred</label>
          <div className="input-group">
            <input 
              type="number" 
              id="expenses_incurred" 
              value={expensesIncurred}
              onChange={(e) => setExpensesIncurred(Number(e.target.value))}
              />
            <div className="input-group-append">
              <span className="input-group-text">%</span>
            </div>
          </div>
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
        <table className="emi-table">
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
      <div>
        <h2>What is lumpsum investment?</h2>
        <p>A lumpsum investment is a type of investment where an investor puts a large amount of money into a financial asset, such as mutual funds, stocks, or bonds, all at once, instead of spreading it out over time. This approach contrasts with systematic investment plans (SIPs), where smaller amounts are invested regularly over a period of time. Some important things to note about lumpsum investments:</p>
        <ul>
          <li><b>Single Transaction</b>: The entire investment amount is invested in one go, making it straightforward and easy to manage.</li>
          <li><b>Market Timing</b>: The success of a lumpsum investment can be significantly influenced by the timing of the investment. If you invest during a market dip, your investment might grow rapidly as the market recovers. Conversely, investing at a market peak might result in lower returns or even losses in the short term.</li>
          <li><b>Risk and Reward</b>: Lumpsum investments carry a higher risk because the entire amount is exposed to market volatility from the moment it's invested. However, if the market performs well after the investment, the potential rewards can be substantial.</li>
          <li><b>Compounding</b>: A lumpsum investment can benefit from the power of compounding over time. The returns generated from the initial investment can be reinvested, leading to exponential growth.</li>
          <li><b>Investor Profile</b>: Lumpsum investments are often favored by investors who have a large amount of money available, such as from a bonus, inheritance, or the sale of an asset. It is also suitable for investors who are confident in their market timing and have a higher risk tolerance.</li>
        </ul>
      </div>
    </div>
  );
}
