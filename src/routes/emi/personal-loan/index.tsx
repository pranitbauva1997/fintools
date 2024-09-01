'use client';

import '../../../styles/main.css';
import { useEffect } from 'react';
import Link from 'next/link';
import EMICalculator from '../../../components/emi';

export default function PersonalLoanEMIPage() {
  const seoData = {
    title: "Personal Loan EMI Calculator | Financial Tools & Calculators",
    description: "Calculate your Equated Monthly Installment (EMI) with our easy-to-use EMI calculator.",
    keywords: ["EMI calculator", "loan calculator", "financial planning", "wealth management", "financial tools", "loan planning", "personal loan", "personal loan EMI calculator", "personal loan fixed rate"],
    url: "https://fintools.bauva.com/emi/personal-loan"
  };
  useEffect(() => {
    document.title = seoData.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', seoData.description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', seoData.url);
    document.querySelector('meta[property="twitter:url"]')?.setAttribute('content', seoData.url);
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', seoData.keywords.join(', '));
  }, []);

  return (
    <div className="container">
      <h1 className="title">Personal Loan EMI Calculator</h1>
      <nav className="navigation">
        <Link href="/sip"><button>SIP</button></Link>
        <Link href="/lumpsum"><button>Lumpsum</button></Link>
        <Link href="/emi/home-loan"><button className="nav-active">EMI</button></Link>
      </nav>
      <div className="emi-navigation">
        <Link href="/emi/home-loan"><button>Home Loan</button></Link>
        <Link href="/emi/personal-loan"><button className="nav-active">Personal Loan</button></Link>
      </div>
      <EMICalculator
        loanAmountInitial={100000}
        loanAmountMin={100000}
        loanAmountMax={1000000}
        loanAmountStep={10000}
        absoluteInterestRateInitial={10}
        absoluteInterestRateMin={1}
        absoluteInterestRateMax={50}
        absoluteInterestRateStep={1}
        timePeriodInYearsInitial={2}
        timePeriodInYearsMin={1}
        timePeriodInYearsMax={7}
        timePeriodInYearsStep={1}
        inflationRateInitial={4}
        inflationRateMin={1}
        inflationRateMax={100}
        inflationRateStep={1}
      />
    </div>
  );
}
