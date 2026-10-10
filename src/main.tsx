import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
// site styles first: Tailwind declares the cascade layer order (theme, base, components, utilities) on first sight
import './styles.css';
import 'react-big-schedule/dist/css/style.css';
import Layout from './components/Layout';
import Demos from './pages/Demos';
import Docs from './pages/Docs';
import Home from './pages/Home';
import Pricing from './pages/Pricing';

const routes: Record<string, () => React.JSX.Element> = {
  '/': Home,
  '/demos': Demos,
  '/docs': Docs,
  '/pricing': Pricing,
};

function App() {
  const read = () => window.location.hash.replace(/^#/, '') || '/';
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const onChange = () => {
      setRoute(read());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  const Page = routes[route] ?? Home;
  return (
    <Layout route={route}>
      <Page />
    </Layout>
  );
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
