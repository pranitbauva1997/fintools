import Link from 'next/link';
import '../styles/main.css';

export default function NotFound() {
  return (
    <div className="container">
      <h1 className="title">404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <nav className="navigation">
        <Link href="/sip"><button>Go to SIP Calculator</button></Link>
        <Link href="/lumpsum"><button>Go to Lumpsum Calculator</button></Link>
        <Link href="/emi/home-loan"><button>Go to EMI Calculator</button></Link>
      </nav>
    </div>
  );
}