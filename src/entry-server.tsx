import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { SiteRoutes } from './RouterApp';
import { canonicalUrl, routeMeta } from './data/routeMeta';

const basePath = import.meta.env.BASE_URL;

/** Renders one app-relative route to a static HTML string. */
export function renderRoute(path: string) {
  const location = `${basePath}${path.replace(/^\/+/, '')}`;

  return renderToString(
    <StaticRouter basename={basePath} location={location}>
      <SiteRoutes />
    </StaticRouter>,
  );
}

export { canonicalUrl, routeMeta };
