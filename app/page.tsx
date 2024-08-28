import Link from "next/link";
import '../styles/main.css';
const Home = () => {
  return (
    <div>
      <h1>Financial Tools & Calculators</h1>
      <p>
        Visit the <Link href="/about">About</Link> page.
      </p>
      <p>
        Visit the <Link href="/sip">SIP</Link> page.
      </p>
      <p>
        Visit the <Link href="/lumpsum">Lumpsum</Link> page.
      </p>
      <p>
        Visit the <Link href="/emi">EMI</Link> page.
      </p>
    </div>
  );
};

export default Home;
