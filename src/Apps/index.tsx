import React, { useState } from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { lightTheme } from "./theme";
import { useTranslation } from "react-i18next";
import { AppRouterProvider, RouterConfig } from "../Libs/RouterConfig";
import "./i18n";
import {routes} from "Apps/routes";


export const App = () => {
    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Main />
        </ThemeProvider>
    );
};

const Main = () => {
    const { t } = useTranslation();
    return (
        <div>
            <h1>{t("Lazy Page routing")}</h1>
            <AppRouterProvider config={routes} />
        </div>
    );
};
