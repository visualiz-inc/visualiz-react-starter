import React, { ReactNode, useState } from "react";
import { Router, useLocation } from "@reach/router";

export {
    Route,
    ChildRoute,
    RouterConfig,
    useAppLocation,
    AppRouter
};

const useAppLocation = () => useLocation();

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
    routes: Route[];
}

interface AppRouterProps {
    config: RouterConfig;
}

type LazyComponent=Promise<{
    default: React.ComponentType<any>;
}>;

const AppRouter = ({ config }: AppRouterProps) => {
    const { basepath, routes } = config;
    return (
        <React.Suspense fallback={<div>...Loading</div>}>
            <Router basepath={basepath}>
                {
                    routes
                        .map(route => <ProjectRoute
                            key={route.path}
                            path={route.path}
                            page={React.lazy(() => route.component())}
                        />)
                }

            </Router >
        </React.Suspense>
    );
};

interface PageProps {
    page: React.LazyExoticComponent<React.ComponentType<any>>;
    path: string;
}

const ProjectRoute = (props: PageProps) => {
    return (
        <>
            <props.page />
        </>
    );
};
