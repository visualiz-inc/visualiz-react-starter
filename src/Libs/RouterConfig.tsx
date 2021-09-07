import React from "react";
import { Router, useLocation, navigate, Redirect } from "@reach/router";
import loadable, { LoadableComponent } from "@loadable/component";

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

interface Route {
    path: string;
    to?: string;
    title: string;
    icon: () => React.ReactNode;
    component: () => LazyComponent;
    role?: number;
    exact?: boolean;
    children?: ChildRoute[];
}

interface ChildRoute {
    path: string;
    component: () => LazyComponent;
    exact?: boolean;
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

type LazyComponent = Promise<{
    default: React.ComponentType<any>;
}>;

const AppRouterProvider = ({ config }: AppRouterProps) => {
    const { basepath, routes } = config;
    return (
        <Router basepath={basepath} style={{ height: "100%" }}>
            {
                routes
                    .map(route => <ProjectRouteLazy
                        key={route.path}
                        path={route.path}
                        page={loadable(() => route.component())}
                    />)
            }
        </Router >
    );
};

interface PageLazyProps {
    page: LoadableComponent<any>;
    path: string;
}

const ProjectRouteLazy = (props: PageLazyProps) => {
    return (
        <>
            <props.page />
        </>
    );
};
