import { renderToString } from 'react-dom/server';
import App from './App';
import { demos } from './demos/registry';
import { RouterProvider } from './router';
import { metaFor } from './seo';
import { SiteProvider } from './site';

/** Every URL the pre-render step writes to disk (also the sitemap). */
export const routes = ['/', '/docs', '/pricing', ...demos.map(d => `/demos/${d.id}`)];

export const render = (path: string) => ({
  html: renderToString(
    <RouterProvider path={path}>
      <SiteProvider>
        <App />
      </SiteProvider>
    </RouterProvider>,
  ),
  meta: metaFor(path),
});
