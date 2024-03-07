import { FunctionComponent } from "react";
import { RouteDefinition } from "../App.routes";
import { Route, Routes } from "react-router-dom";

interface RouteConfigRendererProps {
    routes: RouteDefinition[];
}

export const RouteConfigRenderer: FunctionComponent<RouteConfigRendererProps> = ({routes}) => {
    
    return (
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} >
                    {route.Component && <route.Component {...route as any} ></route.Component>}
                </Route>
            ))}            
        </Routes>        
    );
};
