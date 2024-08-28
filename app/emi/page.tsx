'use client';

import '../../styles/main.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { formatAsINR, truncateToInteger } from '../../lib/index';
import { calculateEMI } from '../../lib/emi';

export default function EMICalculator() {
  const seoData = {
    title: "EMI Calculator | Financial Tools & Calculators",
    description: "Calculate your Equated Monthly Installment (EMI) with our easy-to-use EMI calculator.",
    keywords: ["EMI calculator", "investment calculator", "loan calculator", "financial planning", "wealth management", "financial tools", "investment strategy", "loan planning", "home loan", "car loan", "personal loan", "credit card loan"],
    url: "https://fintools.bauva.com/emi"
  };
  useEffect(() => {
    document.title = seoData.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', seoData.description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', seoData.url);
    document.querySelector('meta[property="twitter:url"]')?.setAttribute('content', seoData.url);
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', seoData.keywords.join(', '));
  }, []);

  const [loanAmount, setLoanAmount] = useState(100000);
  const [absoluteInterestRate, setAbsoluteInterestRate] = useState(10);
  const [timePeriodInYears, setTimePeriodInYears] = useState(2);
  const [inflationRate, setInflationRate] = useState(0);

  const [emi, setEmi] = useState(0);
  const [emiTable, setEmiTable] = useState(new Map());
  const [totalPresentValueOfAllEmis, setTotalPresentValueOfAllEmis] = useState(0);
  const [totalAbsoluteAmountRepaid, setTotalAbsoluteAmountRepaid] = useState(0);
  const [totalAbsoluteInterestPaid, setTotalAbsoluteInterestPaid] = useState(0);
  const [totalRealAmountRepaid, setTotalRealAmountRepaid] = useState(0);

  useEffect(() => {
    const [emi, emiTable, totalPresentValueOfAllEmis] = calculateEMI(
      loanAmount,
      absoluteInterestRate,
      inflationRate,
      timePeriodInYears
    );

    setEmi(emi);
    setEmiTable(emiTable);
    setTotalPresentValueOfAllEmis(totalPresentValueOfAllEmis);

    const calculatedTotalAbsoluteAmountRepaid = emi * timePeriodInYears * 12;
    setTotalAbsoluteAmountRepaid(calculatedTotalAbsoluteAmountRepaid);

    const calculatedTotalAbsoluteInterestPaid = calculatedTotalAbsoluteAmountRepaid - loanAmount;
    setTotalAbsoluteInterestPaid(calculatedTotalAbsoluteInterestPaid);

    setTotalRealAmountRepaid(totalPresentValueOfAllEmis);
  }, [loanAmount, absoluteInterestRate, timePeriodInYears, inflationRate]);

  return (
    <div className="container">
      <h1 className="title">EMI Calculator</h1>
      <nav className="navigation">
        <Link href="/sip"><button>SIP</button></Link>
        <Link href="/lumpsum"><button>Lumpsum</button></Link>
        <Link href="/emi"><button className="nav-active">EMI</button></Link>
      </nav>
      <div className="input">
        <div className="input-same-line">
          <label htmlFor="loan_amount">Loan Amount</label>
          <div className="input-group">
            <input
              type="number"
              id="loan_amount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              placeholder=""
            />
            <div className="input-group-append">
              <span className="input-group-text">₹</span>
            </div>
          </div>
        </div>
        <input
          type="range"
          value={loanAmount}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
          id="loan_amount"
          min="100000"
          max="100000000"
          step="10000"
        />

        <div className="input-same-line">
          <label htmlFor="absolute_interest_rate">
            Interest Rate per year
          </label>
          <div className="input-group">
            <input 
              type="number" 
              id="absolute_interest_rate" 
              value={absoluteInterestRate}
              onChange={(e) => setAbsoluteInterestRate(Number(e.target.value))}
              placeholder=""
            />
            <div className="input-group-append">
              <span className="input-group-text">%</span>
            </div>
          </div>
        </div>
        <input
          type="range"
          value={absoluteInterestRate}
          onChange={(e) => setAbsoluteInterestRate(Number(e.target.value))}
          id="absolute_interest_rate"
          min="1"
          max="100"
          step="1"
        />

        <div className="input-same-line">
          <label htmlFor="time_period_in_years">
            Time Period
          </label>
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
          <label htmlFor="inflation_rate">
            Inflation
          </label>
          <div className="input-group">
            <input
              type="number"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              id="inflation_rate"
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
      </div>

      <div className="output">
        <table className="emi-table">
          <tbody>
            <tr>
              <td>Loan EMI</td>
              <td>{formatAsINR(emi)}</td>
            </tr>
            <tr>
              <td>Total Amount Repaid</td>
              <td>{formatAsINR(totalAbsoluteAmountRepaid)}</td>
            </tr>
            <tr>
              <td>Total Interest Paid</td>
              <td>{formatAsINR(totalAbsoluteInterestPaid)}</td>
            </tr>
            <tr>
              <td>Total Real Amount Repaid</td>
              <td>{formatAsINR(totalRealAmountRepaid)}</td>
            </tr>
          </tbody>
        </table>
        <table className="emi-table">
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
            {Array.from(emiTable).map(([date, data], index) => (
                <tr key={index}>
                  <td>{date.toLocaleDateString()}</td>
                  <td>{formatAsINR(data.interest_component)}</td>
                  <td>{formatAsINR(data.principal_component)}</td>
                  <td>{formatAsINR(data.total_payment)}</td>
                  <td>{formatAsINR(data.present_value_of_emi)}</td>
                  <td>{formatAsINR(data.outstanding_amount)}</td>
                  <td>{truncateToInteger(data.percentage_of_loan_paid)}%</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
