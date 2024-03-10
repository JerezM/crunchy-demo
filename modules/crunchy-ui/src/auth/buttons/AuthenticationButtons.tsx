import { FunctionComponent, useMemo } from "react";
import { LoginButton } from "./LoginButton";
import { RegisterButton } from "./RegisterButton";
import { LogoutButton } from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

export const AuthenticationButtons: FunctionComponent = () => {

    const { isAuthenticated } = useAuth0();

    const btnsToRender = useMemo(() => {
        if (isAuthenticated) {
            return (
                <li>
                    <LogoutButton/>
                </li>
            );
        } else {
            return (
                <>                
                    <li>
                        <LoginButton/>
                    </li>
                    <li>
                        <RegisterButton/>
                    </li>
                </>
            );
        }
    }, [isAuthenticated]);

    return (
        <ul style={{listStyle: 'none', display: 'flex'}}>
            {btnsToRender}
        </ul> 
    );
}