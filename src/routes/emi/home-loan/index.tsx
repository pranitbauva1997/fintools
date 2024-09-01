import { Cluster, Stack } from '@xypnox/xip-ui';
import EMICalculator from '../../../components/emi';
import { SEO } from '~/components/seo';

export default function HomeLoanEMIPage() {
  const seoData = {
    title: "Home Loan EMI Calculator | Financial Tools & Calculators",
    description: "Calculate your Equated Monthly Installment (EMI) with our easy-to-use EMI calculator.",
    keywords: ["EMI calculator", "loan calculator", "financial planning", "wealth management", "financial tools", "loan planning", "home loan", "home loan EMI calculator", "home loan fixed rate", "home loan floating rate"],
    url: "https://fintools.bauva.com/emi/home-loan"
  };

  return (
    <Stack>
      <SEO {...seoData} />
      <h1 class="title">Home Loan EMI Calculator</h1>
      <Cluster>
        EMI Calculators:
        <a href="/emi/home-loan">Home Loan</a>
        <a href="/emi/personal-loan">Personal Loan</a>
      </Cluster>
      <EMICalculator
        loanAmountInitial={1000000}
        loanAmountMin={1000000}
        loanAmountMax={100000000}

        absoluteInterestRateMax={25}

        timePeriodInYearsInitial={10}
        timePeriodInYearsMax={30}
      />
    </Stack>
  );
}
