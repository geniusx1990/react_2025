import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.tsx';
import { FallbackUi } from './components/FallbackUI/FallbackUi.tsx';
import { RouterProvider } from 'react-router';
import { router } from './routes/router.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary fallback={<FallbackUi />}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
);
