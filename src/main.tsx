import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App pathname={window.location.pathname} />
  </StrictMode>
);

// Em produção cada página já vem pré-renderizada (scripts/prerender.mjs); no dev, renderiza do zero.
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
