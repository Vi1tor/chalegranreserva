import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export { SITE, SITE_URL, FAQS, PHOTOS, PAGES } from './data/site';

export function render(pathname: string): string {
  return renderToString(
    <StrictMode>
      <App pathname={pathname} />
    </StrictMode>,
  );
}
