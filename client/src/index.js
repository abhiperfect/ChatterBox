import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-kn0o8dn3aj6rgr3c.us.auth0.com"
    clientId="5b8IPlzHO6Mcta9xQkOMmg34GNexIOBm"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    cacheLocation={'localstorage'}         //To store cookies locally, Refresh the page persist the user data
  >
    <App />
  </Auth0Provider>,
);

