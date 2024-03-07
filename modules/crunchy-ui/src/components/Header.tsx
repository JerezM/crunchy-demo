import { FunctionComponent, useEffect } from "react";
import { TText } from "./utils/Texts";
import { TextType } from "../model/utils/TextType";
import { Colors } from "../utils/Colors";
import { RouteDefinition } from "../App.routes";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../auth/LoginButton";
import { RegisterButton } from "../auth/RegisterButton";
import { LogoutButton } from "../auth/LogoutButton";

interface HeaderProps {
    routes: RouteDefinition[];
}

export const Header: FunctionComponent<HeaderProps> = ({routes}) => {

    const { isAuthenticated } = useAuth0();

    return (
        <div style={{backgroundColor: Colors.PRIMARY_ORANGE, display: 'flex', justifyContent: 'space-between'}}>
            <ul style={{listStyle: 'none', display: 'flex', alignItems: 'center'}}>
                { 
                    routes.map((route, index) => (
                        <li key={index} style={{marginRight: '5px'}}>
                            <NavLink to={route.path?.toString() as string} style={{textDecoration: 'none'}}>
                                <TText type={TextType.HEADER2} style={{color: "white", textAlign: 'center'}}>{route.routeResource?.label}</TText>
                            </NavLink>                        
                        </li>
                    ))                 
                }     
            </ul>
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
        </div> 
    );
}