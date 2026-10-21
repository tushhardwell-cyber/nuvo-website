import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LangProvider } from './i18n/LangContext';

import '@fontsource-variable/manrope';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/400-italic.css';
import '@fontsource/cormorant-garamond/500-italic.css';
import '@fontsource/cinzel/400.css';
import '@fontsource/cinzel/600.css';
import '@fontsource/cinzel/800.css';

import './styles/global.css';
import './styles/components.css';
import './styles/sections.css';
import './styles/pages.css';
import './styles/theme.css';
import './styles/brand.css';
import './styles/talk.css';
import './styles/polish.css';
import './styles/services.css';
import './styles/type.css';
import './styles/lang.css';

import App from './App.jsx';

// Build-time SEO tags and the crawlable text summary are replaced by React / Helmet.
document.querySelectorAll('[data-seo-static]').forEach((n) => n.remove());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <LangProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <App />
        </BrowserRouter>
      </LangProvider>
    </HelmetProvider>
  </React.StrictMode>
);
