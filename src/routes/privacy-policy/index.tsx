import { SEO } from "~/components/seo";

const PrivacyPolicy = () => {
  const seoData = {
    title: "Privacy Policy | Financial Tools & Calculators",
    description: "Privacy Policy for Financial Tools & Calculators",
    keywords: ["Privacy Policy", "Financial Tools", "Calculators", "Investments", "SIP", "Lumpsum", "EMI", "Loans", "EMI Calculator", "Lumpsum Calculator", "SIP Calculator"],
    url: "https://fintools.bauva.com/privacy-policy"
  };
  return (
    <div class="container">
      <SEO {...seoData} />
      <h1>Privacy Policy</h1>
      <p><strong>Effective Date: July 16, 2024</strong></p>

      <p>At this site, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines the types of information we collect, how we use and safeguard that information, and your rights regarding your personal data.</p>

      <h2>1. Information We Collect</h2>

      <h3>1.1. Personal Information</h3>
      <ul>
        <li>When you subscribe to our newsletter or contact us via our website, we may collect personal information such as your name, email address, and any other information you provide.</li>
      </ul>

      <h3>1.2. Usage Data</h3>
      <ul>
        <li>We use PostHog, a web analytics service, to collect information about your interaction with our website. This includes your IP address, browser type, operating system, referring URLs, pages visited, and the date/time of your visit.</li>
      </ul>

      <h3>1.3. Cookies and Tracking Technologies</h3>
      <ul>
        <li>We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can set your browser to refuse all cookies or to indicate when a cookie is being sent.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>

      <h3>2.1. To Provide and Maintain Our Service</h3>
      <ul>
        <li>We use your information to ensure the proper functioning and security of our website.</li>
      </ul>

      <h3>2.2. To Improve Our Service</h3>
      <ul>
        <li>The data collected via PostHog helps us understand how users interact with our website, enabling us to make improvements.</li>
      </ul>

      <h3>2.3. To Communicate With You</h3>
      <ul>
        <li>We use MailerLite to manage our email marketing campaigns. If you subscribe to our newsletter, we will use your email address to send you updates and promotional content. You can unsubscribe from these communications at any time by following the unsubscribe link in the email.</li>
      </ul>

      <h3>2.4. To Comply With Legal Obligations</h3>
      <ul>
        <li>We may disclose your information where required to do so by law or in response to valid requests by public authorities.</li>
      </ul>

      <h2>3. How We Protect Your Information</h2>

      <h3>3.1. Security Measures</h3>
      <ul>
        <li>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</li>
      </ul>

      <h3>3.2. Third-Party Services</h3>
      <ul>
        <li>We ensure that any third-party services we use, such as PostHog and MailerLite, are compliant with relevant data protection regulations and have adequate safeguards in place.</li>
      </ul>

      <h2>4. Your Data Protection Rights</h2>

      <h3>4.1. Access and Correction</h3>
      <ul>
        <li>You have the right to access and correct your personal information. If you wish to update or rectify any data we hold about you, please contact us.</li>
      </ul>

      <h3>4.2. Deletion</h3>
      <ul>
        <li>You have the right to request the deletion of your personal data under certain conditions. Please contact us if you wish to exercise this right.</li>
      </ul>

      <h3>4.3. Objection and Restriction</h3>
      <ul>
        <li>You have the right to object to or restrict the processing of your personal data under certain conditions.</li>
      </ul>

      <h3>4.4. Data Portability</h3>
      <ul>
        <li>You have the right to request a copy of your personal data in a structured, machine-readable format.</li>
      </ul>

      <h2>5. Changes to This Privacy Policy</h2>
      <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with the updated effective date.</p>

      <h2>7. Contact Us</h2>
      <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
      <p>Email: pranit &lt;at&gt; bauva &lt;dot&gt; com</p>
    </div>
  );
};

export default PrivacyPolicy;
