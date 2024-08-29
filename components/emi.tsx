'use client';

import { useState, useEffect } from 'react';
import { formatAsINR, truncateToInteger } from '../lib/index';
import { calculateEMI } from '../lib/emi';

interface EMICalculatorProps {
  loanAmountInitial: number;
  loanAmountMin: number;
  loanAmountMax: number;
  loanAmountStep: number;
  absoluteInterestRateInitial: number;
  absoluteInterestRateMin: number;
  absoluteInterestRateMax: number;
  absoluteInterestRateStep: number;
  timePeriodInYearsInitial: number;
  timePeriodInYearsMin: number;
  timePeriodInYearsMax: number;
  timePeriodInYearsStep: number;
  inflationRateInitial: number;
  inflationRateMin: number;
  inflationRateMax: number;
  inflationRateStep: number;
}

export default function EMICalculator({
  loanAmountInitial,
  loanAmountMin,
  loanAmountMax,
  loanAmountStep,
  absoluteInterestRateInitial,
  absoluteInterestRateMin,
  absoluteInterestRateMax,
  absoluteInterestRateStep,
  timePeriodInYearsInitial,
  timePeriodInYearsMin,
  timePeriodInYearsMax,
  timePeriodInYearsStep,
  inflationRateInitial,
  inflationRateMin,
  inflationRateMax,
  inflationRateStep,
}: EMICalculatorProps) {
  const [loanAmount, setLoanAmount] = useState(loanAmountInitial);
  const [absoluteInterestRate, setAbsoluteInterestRate] = useState(absoluteInterestRateInitial);
  const [timePeriodInYears, setTimePeriodInYears] = useState(timePeriodInYearsInitial);
  const [inflationRate, setInflationRate] = useState(inflationRateInitial);

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
    <>
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
          min={loanAmountMin}
          max={loanAmountMax}
          step={loanAmountStep}
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
          min={absoluteInterestRateMin}
          max={absoluteInterestRateMax}
          step={absoluteInterestRateStep}
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
          min={timePeriodInYearsMin}
          max={timePeriodInYearsMax}
          step={timePeriodInYearsStep}
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
          min={inflationRateMin}
          max={inflationRateMax}
          step={inflationRateStep}
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
    </>
  );
}
