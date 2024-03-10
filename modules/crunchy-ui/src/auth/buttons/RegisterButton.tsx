import { AppState, AuthorizationParams, useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";

export const RegisterButton: FunctionComponent = () => {
    const { loginWithRedirect } = useAuth0();
  
    const handleRegister = () => {
        const appState: AppState = { returnTo: window.location.pathname };
        const authorizationParams: AuthorizationParams = { screen_hint: "signup" };
        loginWithRedirect({ appState, authorizationParams });
    }

    return (
      <Button
          onClick={handleRegister}
      >
          Sign up
      </Button>    
    );
};