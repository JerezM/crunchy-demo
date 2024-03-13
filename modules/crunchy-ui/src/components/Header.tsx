import { FunctionComponent } from "react";
import { TText } from "./utils/Texts";
import { TextType } from "../model/utils/TextType";
import { Colors } from "../utils/Colors";
import { RouteDefinition } from "../App.routes";
import { NavLink } from "react-router-dom";
import { AuthenticationButtons } from "../auth/buttons/AuthenticationButtons";

interface HeaderProps {
    routes: RouteDefinition[];
}

export const Header: FunctionComponent<HeaderProps> = ({routes}) => {

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

            <AuthenticationButtons/>     
        </div> 
    );
}