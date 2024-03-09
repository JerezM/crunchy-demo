import { FunctionComponent } from "react";
import { LoginButton } from "./LoginButton";
import { RegisterButton } from "./RegisterButton";
import { LogoutButton } from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";


export const AuthenticationButtons: FunctionComponent = () => {

    const { isAuthenticated } = useAuth0();

    return (
        <ul style={{listStyle: 'none', display: 'flex'}}>
            {!isAuthenticated ?
                <>                
                    <li>
                        <LoginButton/>
                    </li>
                    <li>
                        <RegisterButton/>
                    </li>
                </>
            :
                <li>
                    <LogoutButton/>
                </li>
            }
        </ul> 
    );
}