import { SEO } from '~/components/seo';
import EMICalculator from '../../../components/emi';
import { Cluster, Stack } from '@xypnox/xip-ui';

export default function PersonalLoanEMIPage() {
  const seoData = {
    title: "Personal Loan EMI Calculator | Financial Tools & Calculators",
    description: "Calculate your Equated Monthly Installment (EMI) with our easy-to-use EMI calculator.",
    keywords: ["EMI calculator", "loan calculator", "financial planning", "wealth management", "financial tools", "loan planning", "personal loan", "personal loan EMI calculator", "personal loan fixed rate"],
    url: "https://fintools.bauva.com/emi/personal-loan"
  };

  return (
    <Stack>
      <SEO {...seoData} />
      <h1 class="title">Personal Loan EMI Calculator</h1>
      <Cluster>
        EMI Calculators:
        <a href="/emi/home-loan">Home Loan</a>
        <a href="/emi/personal-loan">Personal Loan</a>
      </Cluster>
      <EMICalculator
        loanAmountInitial={100000}
        loanAmountMin={100000}
        loanAmountMax={1000000}

        absoluteInterestRateMax={50}

        timePeriodInYearsInitial={2}
        timePeriodInYearsMax={7}
      />
    </Stack>
  );
}
