'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { handleAmountInput, formatAsINR, truncateToTwoDecimalPlaces } from '../../lib/index';
import { calculateEMI } from '../../lib/emi';

export default function EMICalculator() {
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
      <h1>EMI Calculator</h1>
      <p><Link href="/">Home</Link></p>
      <div className="input">
        <div className="input-same-line">
          <label htmlFor="loan_amount">Loan Amount</label>
          <input
            type="text"
            id="loan_amount"
            value={formatAsINR(loanAmount)}
            onChange={(e) => setLoanAmount(handleAmountInput(e))}
            placeholder=""
          />
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
            Absolute Interest Rate (in percentage per year)
          </label>
          <input 
            type="text" 
            id="absolute_interest_rate" 
            value={`${absoluteInterestRate}%`}
            readOnly
          />
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
            Time Period (in years)
          </label>
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
          <label htmlFor="inflation_rate">
            Inflation (in percentage)
          </label>
          <input
            type="number"
            value={inflationRate}
            onChange={(e) => setInflationRate(Number(e.target.value))}
            id="inflation_rate"
            placeholder=""
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
      </div>

      <div className="output">
        <table>
          <tbody>
            <tr>
              <td>Loan EMI</td>
              <td>{formatAsINR(emi)}</td>
            </tr>
            <tr>
              <td>Total Absolute Amount Repaid (Principal + Interest)</td>
              <td>{formatAsINR(totalAbsoluteAmountRepaid)}</td>
            </tr>
            <tr>
              <td>Total Absolute Interest Paid</td>
              <td>{formatAsINR(totalAbsoluteInterestPaid)}</td>
            </tr>
            <tr>
              <td>Total Real Amount Repaid</td>
              <td>{formatAsINR(totalRealAmountRepaid)}</td>
            </tr>
          </tbody>
        </table>
        <p>EMI Table</p>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Interest Component</th>
              <th>Principal Component</th>
              <th>Total Payment</th>
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
                  <td>{truncateToTwoDecimalPlaces(data.percentage_of_loan_paid)} %</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          width: 50%;
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
