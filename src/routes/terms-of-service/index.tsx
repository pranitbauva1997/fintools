import { SEO } from "~/components/seo";

const TermsOfService = () => {
  const seoData = {
    title: "Terms of Service | Financial Tools & Calculators",
    description: "Terms of Service for Financial Tools & Calculators",
    keywords: ["Terms of Service", "Financial Tools", "Calculators", "Investments", "SIP", "Lumpsum", "EMI", "Loans", "EMI Calculator", "Lumpsum Calculator", "SIP Calculator"],
    url: "https://fintools.bauva.com/terms-of-service"
  };
  return (
    <div class="container">
      <SEO {...seoData} />
      <h1>Terms of Service</h1>
      <p><strong>Effective Date: 28th August, 2024</strong></p>

      <p>By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read these Terms of Service ("Terms") carefully before using our website.</p>

      <h2>1. Acceptance of Terms</h2>
      <p>By accessing or using this site, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use our website.</p>

      <h2>2. Use of External Tools</h2>
      <h3>2.1. PostHog</h3>
      <ul>
        <li>We use PostHog for web analytics to understand how users interact with our website. By using our website, you consent to the collection and use of data by PostHog as described in our Privacy Policy.</li>
      </ul>

      <h2>3. Intellectual Property</h2>
      <p>All content on this site, including text, graphics, logos, images, and software, is the property of this site's owners or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or create derivative works from any content on our website without our express written permission.</p>

      <h2>4. User Conduct</h2>
      <p>You agree not to use this site for any unlawful purpose or any purpose prohibited by these Terms. You agree not to:</p>
      <ul>
        <li>Use our website in any manner that could disable, overburden, damage, or impair the site.</li>
        <li>Attempt to gain unauthorized access to any part of our website or any other systems or networks connected to our website.</li>
        <li>Use any automated means to access our website for any purpose without our express written permission.</li>
      </ul>

      <h2>5. Disclaimers</h2>
      <h3>5.1. General Disclaimer</h3>
      <ul>
        <li>The content provided on this site is for informational purposes only. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.</li>
      </ul>
      <h3>5.2. Investment Advice Disclaimer</h3>
      <ul>
        <li>Any advice or information provided on this site should not be considered as investment advice. We are not responsible for any losses or damages that may arise from your reliance on any information provided on this website. Always consult with a qualified financial advisor before making any investment decisions.</li>
      </ul>

      <h2>6. Limitation of Liability</h2>
      <p>To the fullest extent permitted by law, this site's owners shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:</p>
      <ul>
        <li>Your use of or inability to use our website.</li>
        <li>Any unauthorized access to or use of our servers and/or any personal information stored therein.</li>
        <li>Any interruption or cessation of transmission to or from our website.</li>
        <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our website by any third party.</li>
      </ul>

      <h2>7. Indemnification</h2>
      <p>You agree to indemnify, defend, and hold harmless this site's owners and its affiliates, officers, directors, employees, agents, and licensors from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from your use of our website or your violation of these Terms.</p>

      <h2>8. Changes to These Terms</h2>
      <p>We may update our Terms of Service from time to time. We will notify you of any changes by posting the new Terms on this page with the updated effective date. Your continued use of this site after any changes to these Terms will constitute your acceptance of such changes.</p>

      <h2>9. Governing Law</h2>
      <p>These Terms are governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. You agree to submit to the exclusive jurisdiction of the courts located in India to resolve any dispute arising out of these Terms or the use of our website.</p>

      <h2>10. Contact Us</h2>
      <p>If you have any questions or concerns about these Terms, please contact us at:</p>
      <p>Email: pranit &lt;at&gt; bauva &lt;dot&gt; com</p>
    </div>
  );
};

export default TermsOfService;
