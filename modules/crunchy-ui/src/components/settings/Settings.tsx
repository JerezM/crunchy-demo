import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { RouteDefinition } from "../../App.routes";
import { TText } from "../utils/Texts";
import { TextType } from "../../model/utils/TextType";
import { Colors } from "../../utils/Colors";
import { useEffect, useMemo } from "react";
import { CrunchyPaths, Views } from "../../routing/Routes";
import { useUserRoles } from "../../hooks/useUserRoles";

interface SettingsProps {
    routes?: RouteDefinition[];
}

export default function Settings({routes}: SettingsProps) {

    const navigate = useNavigate();
    const location = useLocation();
    const { areRolesLoaded, isAdminUser, containRoles } = useUserRoles();

    const routesToDisplay = useMemo(() => {          
        if (areRolesLoaded) {
            return routes?.filter(route => (route.rolesNeeded && containRoles(route.rolesNeeded) || !route.rolesNeeded)) || [];
        } else {
            return routes?.filter(route => !route.rolesNeeded) || [];
        }
    }, [areRolesLoaded, routes]);


    useEffect(() => {
        // Redirect to /settings/profile automatically when route 'settings' is loaded
        if (location.pathname === CrunchyPaths.getPath(Views.SETTINGS)) {
            navigate(CrunchyPaths.getPath(Views.PROFILE), { replace: true });
        }

        /*if (location.pathname === CrunchyPaths.getPath(Views.ADMIN) && (areRolesLoaded && !isAdminUser)) {
            navigate(CrunchyPaths.getPath(Views.NOT_FOUND));

            // Keeps the original URL in the address bar
            window.history.replaceState({}, '', location.pathname);
        }*/ //Refactor to not redirect non-admin users to not-found page
    }, [navigate, location.pathname, areRolesLoaded, isAdminUser]);

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '250px', backgroundColor: Colors.SIDE_BAR, padding: '20px', display: 'flex', flexDirection: 'column'}}>
                {routesToDisplay.map((route, index) => (
                    <NavLink key={index} to={route.path?.toString() as string} style={{textDecoration: 'none', marginBottom: '5px'}}>
                        <TText type={TextType.HEADER2} style={{color: "white", textAlign: 'center'}}>{route.routeResource?.label}</TText>
                    </NavLink>
                ))}                                        
            </div>
            <div style={{ flex: 1, padding: '20px' }}>
                <Outlet />
            </div>
        </div>
    );
}