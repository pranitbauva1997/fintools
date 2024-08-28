import Footer from '../components/footer';
import '../styles/main.css';
import { ErrorBoundary } from 'react-error-boundary';
import NotFound from './not-found';

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
        <ErrorBoundary fallback={<NotFound />}>
          {children}
        </ErrorBoundary>
        <Footer />
      </body>
    </html>
  );
}
