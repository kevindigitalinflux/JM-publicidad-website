import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './lib/i18n';
import './index.css';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

const HomePage     = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage').then(m => ({ default: m.PortfolioPage })));
const ContactPage  = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));

function LangSync() {
  const { i18n } = useTranslation();
  useEffect(() => { document.documentElement.lang = i18n.language; }, [i18n.language]);
  return null;
}

/** Root application component — BrowserRouter, shared layout, and all routes */
export function App() {
  return (
    <BrowserRouter>
      <LangSync />
      <Header />
      <Suspense fallback={<div className="min-h-screen bg-jm-bg" />}>
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
