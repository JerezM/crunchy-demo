import { RouteProps } from "react-router-dom";
import { CrunchyPaths, Views } from "./routing/Routes";
import { Home } from "./components/Home";
import { Todolist } from "./components/todolist/Todolist";
import { Profile } from "./components/settings/Profile";
import { Admin } from "./components/settings/Admin";
import Settings from "./components/settings/Settings";
import { AuthenticationGuard } from "./auth/AuthenticationGuard";

interface CustomRouteProps {
    routeResource?: RouteResource;
    routes?: RouteDefinition[];
    // Is used to indicate when a child route is the default route of a nested routes.
    isIndex?: boolean;// Defines if the route is index.
    needAuthentication?: boolean;// Will add the AuthenticationGuard to the route with this flag.
    //needAdmin?: boolean; // Only display the route is the user is authenticated with an admin user
}

interface RouteResource {
    label?: string;
    // Here I can also add the roles related to each route
}

type RouteDefinition = RouteProps & CustomRouteProps;

const getRoutes = (): RouteDefinition[] => ([
    {
        path: CrunchyPaths.getPath(Views.HOME),
        element: <Home/>,
        routeResource: {
            label: "Home"
        },
    },
    {
        path: CrunchyPaths.getPath(Views.ITEMS),
        element: <AuthenticationGuard component={Todolist}/>,
        needAuthentication: true,        
        routeResource: {
            label: "Items"
        },
    },
    {
        path: CrunchyPaths.getPath(Views.SETTINGS),
        Component: Settings,
        needAuthentication: true,
        routeResource: {
            label: "Settings"
        },
        routes: [
            {
                path: CrunchyPaths.getPath(Views.PROFILE),
                element: <AuthenticationGuard component={Profile}/>,
                isIndex: true,
                routeResource: {
                    label: "Profile"
                },
            },
            {
                path: CrunchyPaths.getPath(Views.ADMIN),
                element: <AuthenticationGuard component={Admin}/>,
                //needAdmin: true,
                routeResource: {
                    label: "Admin"
                },
            }
        ],
    },    
]);

export { getRoutes };
export type { RouteDefinition };
