import Footer from '../components/footer';
import '../styles/main.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Financial Tools & Calculators</title>
      </head>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
