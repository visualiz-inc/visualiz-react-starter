import React from "react";
import { RouterConfig } from "Libs/RouterConfig";

export const routes: RouterConfig = {
    basepath: "/app",
    homepath: "/app",
    routes: [
        {
            component:() => import("./Views/TestPage"),
            icon: () => <div></div>,
            path: "/test",
            title: "1234"
        }
    ]
};