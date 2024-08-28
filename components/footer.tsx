import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          Built by <a href="https://bauva.com" target="_blank" rel="noopener noreferrer">Pranit Bauva</a>
        </p>
        <nav className="footer-links">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;