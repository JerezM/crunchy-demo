import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { App } from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID, REACT_APP_AUTH0_AUDIENCE } = process.env;

const auth0Domain = REACT_APP_AUTH0_DOMAIN as string;
const auth0ClientId = REACT_APP_AUTH0_CLIENT_ID as string;
const auth0Audience = REACT_APP_AUTH0_AUDIENCE as string;
console.log(auth0Domain, auth0ClientId, auth0Audience);

root.render(
  <BrowserRouter>
    <Auth0Provider 
      domain={auth0Domain} 
      clientId={auth0ClientId}
      authorizationParams={{
        audience: auth0Audience,
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </BrowserRouter>
);


