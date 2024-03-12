import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { RouteDefinition } from "../../App.routes";
import { TText } from "../utils/Texts";
import { TextType } from "../../model/utils/TextType";
import { Colors } from "../../utils/Colors";
import { useEffect } from "react";
import { CrunchyPaths, Views } from "../../routing/Routes";

interface SettingsProps {
    routes?: RouteDefinition[];
}

export default function Settings({routes}: SettingsProps) {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Redirect to /settings/profile automatically when route 'settings' is loaded
        if (location.pathname === CrunchyPaths.getPath(Views.SETTINGS)) {
            navigate(CrunchyPaths.getPath(Views.PROFILE), { replace: true });
        }
    }, [navigate, location.pathname]);

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '250px', backgroundColor: Colors.SIDE_BAR, padding: '20px', display: 'flex', flexDirection: 'column'}}>
                {routes?.map((route, index) => (/*.filter(route => !route.needAdmin)*/ // TODO refactor when roles are applied
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