import { RouteProps } from "react-router-dom";
import { Views, getPath } from "./routing/Routes";
import { Home } from "./components/Home";
import { Todolist } from "./components/todolist/Todolist";
import { Profile } from "./components/settings/Profile";
import { Admin } from "./components/settings/Admin";
import Settings from "./components/settings/Settings";
import { Roles } from "./model/Roles";

interface CustomRouteProps {    
    routes?: RouteDefinition[];
    label: string;
    isIndex?: boolean;// Defines if the route is index. Is used to indicate when a child route is the default route of a nested routes.
    needAuthentication?: boolean;// Will add the AuthenticationGuard to the route with this flag.
    rolesNeeded?: Roles[]; // Only display the route is the user is authenticated with an admin role
}

export type RouteDefinition = RouteProps & CustomRouteProps;

export const getRoutes = (): RouteDefinition[] => ([
    {
        path: getPath(Views.HOME),
        element: <Home/>,
        label: "Home",
    },
    {
        path: getPath(Views.ITEMS),
        element: <Todolist/>,
        needAuthentication: true,        
        label: "Items",
    },
    {
        path: getPath(Views.SETTINGS),
        Component: Settings,
        needAuthentication: true,
        label: "Settings",
        routes: [
            {
                path: getPath(Views.PROFILE),
                element: <Profile/>,
                needAuthentication: true,
                isIndex: true,
                label: "Profile",
            },
            {
                path: getPath(Views.ADMIN),
                element: <Admin/>,
                needAuthentication: true,
                rolesNeeded: [Roles.ADMIN],
                label: "Admin",
            }
        ],
    },    
]);