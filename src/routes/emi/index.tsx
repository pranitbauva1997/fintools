import { SEO } from '~/components/seo';

export default function EMIPage() {
  const seoData = {
    title: "EMI Calculator | Financial Tools & Calculators",
    description: "Calculate your Equated Monthly Installment (EMI) with our easy-to-use EMI calculator.",
    keywords: ["EMI calculator", "investment calculator", "loan calculator", "financial planning", "wealth management", "financial tools", "investment strategy", "loan planning", "home loan", "car loan", "personal loan", "credit card loan"],
    url: "https://fintools.bauva.com/emi"
  };
  return (
    <div class="container">
      <SEO {...seoData} />
      <h1 class="title">EMI Calculator</h1>
      <nav class="navigation">
        <a href="/sip"><button>SIP</button></a>
        <a href="/lumpsum"><button>Lumpsum</button></a>
        <a href="/emi"><button class="nav-active">EMI</button></a>
      </nav>
      <div class="emi-navigation">
        <a href="/emi/home-loan"><button>Home Loan</button></a>
        <a href="/emi/personal-loan"><button>Personal Loan</button></a>
      </div>
      <p>You should have been redirected to <a href="/emi/home-loan">Home Loan</a></p>
    </div>
  );
}
