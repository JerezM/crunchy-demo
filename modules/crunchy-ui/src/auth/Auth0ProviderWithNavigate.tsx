import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Auth0ProviderWithNavigateProps {
    children: React.ReactNode;
}

export const Auth0ProviderWithNavigate: FC<Auth0ProviderWithNavigateProps> = ({children}) => {

    const { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID, REACT_APP_AUTH0_AUDIENCE, REACT_APP_AUTH0_CALLBACK_URL } = process.env;
    const domain = REACT_APP_AUTH0_DOMAIN as string;
    const clientId = REACT_APP_AUTH0_CLIENT_ID as string;
    const audience = REACT_APP_AUTH0_AUDIENCE as string;
    const redirect_url =  REACT_APP_AUTH0_CALLBACK_URL as string;    
    
    const navigate = useNavigate();

    const onRedirectCallback = (appState: AppState | undefined) => {
        navigate(appState?.returnTo || window.location.pathname);
    };

    if (!(domain && clientId && redirect_url)) {
        return null;
    }

    return (
        <Auth0Provider
            domain={domain} 
            clientId={clientId}
            authorizationParams={{
                audience: audience,
                redirect_uri: redirect_url,
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
}