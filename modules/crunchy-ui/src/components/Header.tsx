import { FunctionComponent, useMemo } from "react";
import { TText } from "./utils/Texts";
import { TextType } from "../model/utils/TextType";
import { Colors } from "../utils/Colors";
import { RouteDefinition } from "../App.routes";
import { NavLink } from "react-router-dom";
import { AuthenticationButtons } from "../auth/buttons/AuthenticationButtons";
import { useAuth0 } from "@auth0/auth0-react";

interface HeaderProps {
    routes: RouteDefinition[];
}

export const Header: FunctionComponent<HeaderProps> = ({routes}) => {

    const { isAuthenticated } = useAuth0();

    const routesToDisplay = useMemo(() => {// Only shows the links that don't need auth
        return isAuthenticated ? routes : routes.filter(route => !route.showOnlyAuthenticated);
    }, [isAuthenticated, routes]);

    return (
        <div style={{backgroundColor: Colors.PRIMARY_ORANGE, display: 'flex', justifyContent: 'space-between'}}>
            <ul style={{listStyle: 'none', display: 'flex', alignItems: 'center'}}>
                { 
                    routesToDisplay.map((route, index) => (
                        <li key={index} style={{marginRight: '5px'}}>
                            <NavLink to={route.path?.toString() as string} style={{textDecoration: 'none'}}>
                                <TText type={TextType.HEADER2} style={{color: "white", textAlign: 'center'}}>{route.routeResource?.label}</TText>
                            </NavLink>                        
                        </li>
                    ))                 
                }     
            </ul>

            <AuthenticationButtons/>     
        </div> 
    );
}