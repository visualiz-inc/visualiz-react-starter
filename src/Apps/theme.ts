import { createTheme, ThemeOptions } from "@mui/material";
import { mergeDeeply } from "../Libs/Utils/DeepMerge";

const main = "rgb(11, 167, 191)";
const dark = "rgb(11, 167, 191)";
const light = "rgb(11, 167, 191)";

const common: ThemeOptions = {
    palette: {
        primary: {
            light: light,
            main: main,
            dark: dark,
            contrastText: "#fff",
        },
        secondary: {
            light: "rgb(46,46,46)",
            main: "rgb(24,24,24)",
            dark: "rgb(12,12,12)",
            contrastText: "#fff",
        },
        text: {
            primary: "rgba(0,0,0,0.67)",
            secondary: "rgba(0,0,0,0.4)"
        },
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: "rgb(236, 236, 236)",
                }
            }
        },
        MuiInput: {
            styleOverrides: {
                underline: {
                    "&:before": {
                        borderBottom: "2px solid rgb(42, 42, 42)"
                    },
                    "&:hover:not(.Mui-disabled):before ": {
                        borderBottom: "2px solid rgb(42, 42, 42, 0.54)",
                    }
                },
            },
        },
        MuiInputBase: {
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderWidth: "2px",
                    borderColor: "rgba(0, 0, 0, 0.54);"
                },
            }
        },
        MuiDivider: {
            styleOverrides: {
                vertical: {
                    width: "2px"
                }
            }
        }
    },
    typography: {
        fontFamily: "Noto Sans JP, sans-serif",
        fontWeightRegular: 500,
        fontWeightLight: 300,
        fontWeightBold: 700,
        fontWeightMedium: 500,
        h1: {
            fontWeight: 400,
            fontSize: "3rem"
        },
        h2: {
            fontWeight: 400,
            fontSize: "2.4rem"
        },
        h3: {
            fontWeight: 400,
            fontSize: "2rem"
        },
        h4: {
            fontWeight: 500,
            fontSize: "1.6rem"
        },
        h5: {
            fontWeight: 500,
            fontSize: "1.2rem"
        },
        h6: {
            fontWeight: 500,
            fontSize: "0.9rem"
        },
    },
};

const darkOption: ThemeOptions = {
};

const lightOption: ThemeOptions = {
    palette: {
        background: {
            default: "rgb(246,246,246)",
            paper: "rgb(255,255,255)"
        }
    },
};

export const darkTheme = createTheme(mergeDeeply(common, darkOption));
export const lightTheme = createTheme(mergeDeeply(common, lightOption));

