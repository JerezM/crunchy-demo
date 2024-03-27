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
        return checkAuthenticationWrap(route, route.needAuthentication ?? false);
    }

    const checkAuthenticationWrap = (route: RouteDefinition, needAuthentication: boolean) => {
        // Check if it is a component or a element based on the presence of route.Component
        const isComponent = Boolean(route.Component);
        const RouteComponent = route.Component as React.ComponentType<any>;

        if (needAuthentication) {
            return isComponent ?
                <AuthenticationGuard component={() => <RouteComponent {...route as any}/> }/>
                :
                <AuthenticationGuard component={() => <>{ route.element }</>}/>
            ;
        } else {
            //If doesn't require auth, render directly the component or the element
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
            const routes = [<Route key={index} path={route.path} element={getElement(route)} />];

            if (route.isIndex) {
                // For index routes, ensure they are rendered at the parent path
                routes.unshift(<Route key={`${index}-index`} index element={route.element} />);
                // Add a catch-all not-found route specific to this nested route's context
                routes.push(<Route key={`${index}-notfound`} path="*" element={<NotFoundPage/>} />);
            }

            return <>{routes}</>;
        }
    }

    return (
        <Routes>
            {routes.map((route, index) => (
                createTree(route, index)
            ))}
            <Route path={'/callback'} element={<CallbackPage/>} />
            {/*<Route path={'/not-found'} element={<NotFoundPage/>}/>*/}
            <Route path={'*'} element={<NotFoundPage/>}/>          
        </Routes>        
    );
};