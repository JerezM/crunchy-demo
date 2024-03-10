import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";


export const LogoutButton: FunctionComponent = () => {
    const { logout } = useAuth0();
  
    return (
      <Button
          onClick={() => logout({
            logoutParams: {
                returnTo: window.location.origin
            }
          })}
      >
          Logout
      </Button>    
    );
};