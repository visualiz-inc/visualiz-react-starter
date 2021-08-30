import React, { useState } from "react";
import { Box, CssBaseline, Divider, Grow, LinearProgress, ThemeProvider, Toolbar } from "@material-ui/core";
import { lightTheme } from "./theme";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
        },
        ja: {
        },
    },
    lng: 'ja',
    fallbackLng: 'ja',
    interpolation: { escapeValue: false },
});

export const App = () => {

    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            < div >
                Hello
            </div>
        </ThemeProvider>
    );
}
