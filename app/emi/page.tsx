'use client';

import '../../styles/main.css';
import Link from 'next/link';
import { useEffect } from 'react';

export default function EMIPage() {
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

  return (
    <div className="container">
      <h1 className="title">EMI Calculator</h1>
      <nav className="navigation">
        <Link href="/sip"><button>SIP</button></Link>
        <Link href="/lumpsum"><button>Lumpsum</button></Link>
        <Link href="/emi"><button className="nav-active">EMI</button></Link>
      </nav>
      <div className="emi-navigation">
        <Link href="/emi/home-loan"><button>Home Loan</button></Link>
        <Link href="/emi/personal-loan"><button>Personal Loan</button></Link>
      </div>
      <p>You should have been redirected to <Link href="/emi/home-loan">Home Loan</Link></p>
    </div>
  );
}
