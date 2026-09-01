import { createRoot, hydrateRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import RouterApp from './RouterApp';
import './styles.css';

const container = document.getElementById('root')!;

// The production HTML is prerendered, so hydrate it instead of throwing it away.
// `npm run dev` serves an empty shell and falls back to a fresh client render.
if (container.firstElementChild) {
  hydrateRoot(container, <RouterApp />);
} else {
  createRoot(container).render(<RouterApp />);
}
