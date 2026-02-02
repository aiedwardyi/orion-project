import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

// GLOBAL ERROR TRAP - Must be at top
window.addEventListener("error", (e) => {
  console.error("GLOBAL ERROR TRAP:", e.error ?? e.message, e);
});
window.addEventListener("unhandledrejection", (e) => {
  console.error("UNHANDLED PROMISE:", e.reason, e);
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);