import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// site styles first: Tailwind declares the cascade layer order (theme, base, components, utilities) on first sight
import './styles.css';
import 'react-big-schedule/dist/css/style.css';
import App from './App';
import { RouterProvider } from './router';
import { SiteProvider } from './site';

// the HTML is pre-rendered for crawlers; createRoot replaces it with the live app
createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RouterProvider>
      <SiteProvider>
        <App />
      </SiteProvider>
    </RouterProvider>
  </StrictMode>,
);
