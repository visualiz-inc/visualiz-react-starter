import React from "react";
import { AppRouter, RouterConfig } from "Libs/RouterConfig";

export const routes: RouterConfig = {
    basepath: "/app",
    routes: [
        {
            component:() => import("./Views/TestPage"),
            icon: () => <div></div>,
            path: "/test",
            title: "1234"
        }
    ]
};