import Link from 'next/link'


const Home = () => {
  return (
    <div>
      <h1>Financial Tools & Calculators</h1>
      <p>
        Visit the <Link href="/sip">SIP</Link> page.
      </p>
      <p>
        Visit the <Link href="/lumpsum">Lumpsum</Link> page.
      </p>
      <p>
        Visit the <Link href="/emi">EMI</Link> page.
      </p>
      <p>
        Visit the <Link href="/privacy-policy">Privacy Policy</Link> page.
      </p>
      <p>
        Visit the <Link href="/terms-of-service">Terms of Service</Link> page.
      </p>
    </div>
  );
};

export default Home;
