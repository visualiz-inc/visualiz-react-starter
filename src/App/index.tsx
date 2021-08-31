import React from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { lightTheme } from "./theme";
import { useTranslation } from "react-i18next";

import "./i18n";

export const App = () => {
    const { t } = useTranslation();
    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <div>
                {t("text1")}
            </div>
        </ThemeProvider>
    );
};
