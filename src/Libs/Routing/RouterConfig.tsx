import React, { ReactNode, useContext } from "react";
import { Router, useLocation, navigate, Redirect } from "@reach/router";
import loadable from "@loadable/component";

export {
    Route,
    ChildRoute,
    RouterConfig,
    useAppLocation,
    useAppNavigate,
    AppRouterProvider
};

const useAppLocation = () => useLocation();
const useAppNavigate = () => navigate;

const RouterConfigContext = React.createContext<ChildRoute[] | undefined>([]);

type LazyComponent = Promise<{ default: React.ComponentType<any>; }> | ReactNode;

interface ChildRoute {
    path: string;
    component: () => LazyComponent;
    exact?: boolean;
    children?: ChildRoute[];
}

interface Route extends ChildRoute {
    path: string;
    to: string;
    title: string;
    icon: () => React.ReactNode;
    role?: number;
    children?: ChildRoute[];
}

interface RouterConfig {
    basepath: string;
    homepath: string;
    routes: Route[];
}

interface AppRouterProps {
    config: RouterConfig;
}

const getLoadableOrNode = (c: () => LazyComponent) => {
    const d = c();
    if (d instanceof Promise) {
        return loadable(() => d);
    }
    else {
        return d;
    }
};

const AppRouterProvider = ({ config }: AppRouterProps) => {
    const { basepath, routes } = config;
    return (

        <Router basepath={basepath} style={{ height: "100%" }}>
            {
                routes
                    .map(route =>
                        <ProjectRouteLazy
                            routes={route.children}
                            key={route.path}
                            path={route.path}
                            page={getLoadableOrNode(route.component)}
                        />
                    )
            }
        </Router >
    );
};

interface PageLazyProps {
    page: any;
    path: string;
    routes?: ChildRoute[];
}

const ProjectRouteLazy = (props: PageLazyProps) => {
    return (
        <RouterConfigContext.Provider value={props.routes}>
            <props.page />
        </RouterConfigContext.Provider >
    );
};

interface ChildRouterProps {
    additionalRoutes?: ChildRoute[];
}

const ChildRouter = (props: ChildRouterProps) => {
    const context = useContext(RouterConfigContext);
    const children = context ?? [];

    const routes = [...children, ...(props.additionalRoutes ?? [])];

    console.log(routes);

    if (!routes.length) {
        return <></>;
    }

    return (
        <RouterConfigContext.Provider value={routes}>
            <Router>
                {routes.map(route =>
                    <ChildRoute
                        key={route.path}
                        path={route.path}
                        page={getLoadableOrNode(route.component)}
                    />
                )}
            </Router>
        </RouterConfigContext.Provider>
    );
};

interface ChildRouteProps {
    page: any;
    path: string;
}

const ChildRoute = (props: ChildRouteProps) => {
    return (
        <>
            {props.page}
        </>
    );
};