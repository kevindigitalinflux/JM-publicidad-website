import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './lib/i18n';
import './index.css';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

const HomePage     = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage').then(m => ({ default: m.PortfolioPage })));
const ContactPage  = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));

/** Root application component — BrowserRouter, shared layout, and all routes */
export function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}
