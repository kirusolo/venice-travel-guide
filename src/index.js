import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n/i18n'; // Import i18n configuration
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for PWA functionality
serviceWorkerRegistration.register();