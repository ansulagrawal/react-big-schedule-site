import Layout from './components/Layout';
import Demos from './pages/Demos';
import Docs from './pages/Docs';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Pricing from './pages/Pricing';
import { usePath } from './router';

const routes: Record<string, () => React.JSX.Element> = {
  '/': Home,
  '/demos': Demos,
  '/docs': Docs,
  '/pricing': Pricing,
};

export default function App() {
  const path = usePath();
  const Page = path === '/' ? Home : (routes[`/${path.split('/')[1] ?? ''}`] ?? NotFound);
  return (
    <Layout route={path}>
      <Page />
    </Layout>
  );
}
