import React from "react";
import { RouterConfig } from "Libs/RouterConfig";

export const routes: RouterConfig = {
    // absolute path
    basepath: "/app",
    // default home page path
    homepath: "/app",
    routes: [
        {
            component: () => import("./Views/SpaHomePage"),
            icon: () => <></>,
            path: "/",
            title: ""
        },
        {
            component: () => import("./Views/CounterPage"),
            icon: () => <></>,
            path: "/counter",
            title: ""
        }
    ]
};