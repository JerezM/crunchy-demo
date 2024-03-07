import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";


export const RegisterButton: FunctionComponent = () => {
    const { loginWithRedirect } = useAuth0();
  
    return (
      <Button
          onClick={() => loginWithRedirect({
            authorizationParams: {
                screen_hint: "singup",
            }
        })}
      >
          Sign up
      </Button>    
    );
};