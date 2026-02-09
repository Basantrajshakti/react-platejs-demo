import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Add portal container for Radix UI components
const portalRoot = document.createElement('div');
portalRoot.id = 'portal-root';
portalRoot.style.position = 'relative';
portalRoot.style.zIndex = '9999';
document.body.appendChild(portalRoot);

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
