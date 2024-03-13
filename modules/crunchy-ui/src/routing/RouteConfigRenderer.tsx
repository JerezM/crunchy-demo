import { FunctionComponent } from "react";
import { RouteDefinition } from "../App.routes";
import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "../components/NotFoundPage";
import CallbackPage from "../components/CallbackPage";
import { AuthenticationGuard } from "../auth/AuthenticationGuard";
import { useUserRoles } from "../hooks/useUserRoles";

interface RouteConfigRendererProps {
    routes: RouteDefinition[];
}

export const RouteConfigRenderer: FunctionComponent<RouteConfigRendererProps> = ({routes}) => {

    const { containRoles } = useUserRoles();
    
    const getElement = (route: RouteDefinition) => {
        if (route.element) {
            return checkAuthenticationWrap(route, route.needAuthentication ?? false);
        } else {
            return checkAuthenticationWrap(route, route.needAuthentication ?? false, true);
        }
    }

    const checkAuthenticationWrap = (route: RouteDefinition, needAuthentication: boolean, isComponent?: boolean) => {
        const RouteComponent = route.Component as React.ComponentType<any>;
        if (needAuthentication) {
            return isComponent ? <AuthenticationGuard component={() => <RouteComponent {...route as any}/> }/> : <AuthenticationGuard component={() => <>{ route.element }</>}/> 
        } else {
            return isComponent ? <RouteComponent {...route as any}/> : route.element;
        }
    }

    const createTree = (route: RouteDefinition, index: number): JSX.Element => {
        if (route.rolesNeeded && !containRoles(route.rolesNeeded)) {
            return <></>;
        } 

        // If the route has nested routes, first create a component <Route> for the parent route
        if (route.routes) {
            return (                
                <Route key={index} path={route.path} element={getElement(route)/*route.element ? route.element : (route.Component && <route.Component {...route as any}/>)*/}>                    
                    {route.routes.map((childRoute, index) => createTree(childRoute, index))}
                </Route>
            );
        } else {
            // If it is a index route, declare twice, once without 'path' and index as true, and the other as usual
            if (route.isIndex) {                
                return (<>
                    <Route key={index} index element={route.element} />
                    <Route key={index * index} path={route.path} element={getElement(route)/*route.element*/} />
                    <Route key={index * index + 1} path={'*'} element={<NotFoundPage/>} />
                </>);
            } else {
                // For routes without index, only create a <Route> with a 'path'
                return <Route key={index} path={route.path} element={getElement(route)/*route.element*/} />;
            }
        }
    }

    return (
        <Routes>
            {routes.map((route, index) => (
                createTree(route, index)
            ))}
            <Route path={'/callback'} element={<CallbackPage/>} />
            <Route path={'/not-found'} element={<NotFoundPage/>}/>
            <Route path={'*'} element={<NotFoundPage/>}/>          
        </Routes>        
    );
};