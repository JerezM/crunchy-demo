import { FunctionComponent } from "react";
import { RouteDefinition } from "../App.routes";
import { Route, Routes } from "react-router-dom";

interface RouteConfigRendererProps {
    routes: RouteDefinition[];
}

export const RouteConfigRenderer: FunctionComponent<RouteConfigRendererProps> = ({routes}) => {
    
    const createTree = (route: RouteDefinition, index: number): JSX.Element => {
        // If the route has nested routes, first create a component <Route> for the parent route
        if (route.routes) {
            return (                
                <Route key={index} path={route.path} element={route.element ? route.element : (route.Component && <route.Component {...route as any}/>)}>                    
                    {route.routes.map((childRoute, index) => createTree(childRoute, index))}
                </Route>
            );
        } else {
            // If it is a index route, declare twice, once without 'path' and index as true, and the other as usual
            if (route.isIndex) {                
                return (<>
                    <Route key={index} index element={route.element} />
                    <Route key={index * index} path={route.path} element={route.element} />
                    <Route key={index * index + 1} path={'*'} element={<></>} />
                </>);
            } else {
                // For routes without index, only create a <Route> with a 'path'
                return <Route key={index} path={route.path} element={route.element} />;
            }
        }
    }

    return (
        <Routes>
            {routes.map((route, index) => (
                createTree(route, index)
            ))}            
        </Routes>        
    );
};