import { AppState, useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";

export const LoginButton: FunctionComponent = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    const appState: AppState = { returnTo: window.location.pathname };
    loginWithRedirect({ appState });
  }

  return (
    <Button
        onClick={handleLogin}
    >
        Log in
    </Button>    
  );
};