import React, { Suspense, useState, useRef, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme, Theme, createStyles } from "@material-ui/core/styles";
import { fromEvent, timer, from } from "rxjs";
import { pairwise, map, concatMap } from "rxjs/operators";
import MenuIcon from "@material-ui/icons/Menu";
import {
    Box,
    ListItemText,
    ListItemIcon,
    ListItem,
    List,
    Icon,
    IconButton,
    Typography,
    Hidden,
    Drawer,
    Toolbar,
    Divider, Avatar
} from "@material-ui/core";
import { useLocation } from "@reach/router";
import { useTranslation } from "react-i18next";

const closeWidth = 52;
const drawerWidth = 320;
const AUTO_CLOSE_WIDTH = 960;

interface FrameProps {
    menus?: Route[];
    routePressed?: (route: Route) => void | Promise<void>;
    logo?: (isOpen: boolean) => React.ReactNode;
    commandBox?: (isOpen: boolean) => React.ReactNode;
    toolbarContent?: () => React.ReactNode;
    children: React.ReactNode;
}

export function Frame(props: FrameProps) {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(AUTO_CLOSE_WIDTH <= window.innerWidth);
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();
    const opacityAnimationElement = useRef<HTMLDivElement | null>(null);
    const [t] = useTranslation();


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    fromEvent(window, "resize").pipe(
        map(e => window.innerWidth),
        pairwise(),
    ).subscribe(e => {
        const [beforeWidth, currentWidth] = e;

        if (AUTO_CLOSE_WIDTH < currentWidth) {
            if (beforeWidth < currentWidth) {
                setMobileOpen(true);
            }
        }
        else {
            if (beforeWidth >= currentWidth) {
                setMobileOpen(false);
            }
        }
    });

    const routePressed = async (route: Route) => {
        props.routePressed && props.routePressed(route);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Hidden xsUp implementation="js">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaperOpen,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <nav className={classes.drawer}
                        aria-label="mailbox folders">
                        <div style={{ width: drawerWidth }}>
                            <div className={classes.toolbar} />
                            <NavigationList
                                menus={props.menus ?? []}
                                routePressed={routePressed} />
                        </div>
                    </nav>
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="js">
                <nav className={classes.drawer}
                    style={{ width: mobileOpen ? drawerWidth : closeWidth }}
                    aria-label="mailbox folders">
                    <Drawer
                        classes={{
                            paper: mobileOpen ? classes.drawerPaperOpen : classes.drawerPaperClose
                        }}
                        variant="permanent"
                        open
                    >
                        <div style={{ width: drawerWidth }}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerToggle}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Box display="flex"
                                alignItems="center"
                                justifyContent={mobileOpen ? "center" : "start"}
                                p={1}>
                                {props.logo && props.logo(mobileOpen)}
                            </Box>

                            {/* Profile */}
                            <Box flex="1 1 auto" marginLeft="28px" width="calc(100% - 94px)">
                                <Typography variant="caption" style={{ color: "rgb(168,168,168)" }} >
                                    {mobileOpen ? t("管理者ツール") : ""}
                                </Typography>
                            </Box>

                            <Box display="flex"
                                alignItems="center"
                                justifyContent="center"
                                padding={mobileOpen ? "8px" : "0px"}
                                mt={2}>
                                {props.commandBox}
                            </Box>

                            {/* Navigation */}
                            <NavigationList
                                menus={props.menus ?? []}
                                routePressed={routePressed} />
                        </div>
                    </Drawer>
                </nav>
            </Hidden>
            <main className={classes.content} >
                {props.children}
            </main>
        </div >
    );
}

export interface Route {
    path: string;
    name: string;
    icon: React.ReactNode;
    component: () => React.ReactNode;
}

type DrawerPropos = {
    menus: Route[];
    routePressed: (route: Route) => void | Promise<void>;
}

function NavigationList(props: DrawerPropos) {
    const location = useLocation();
    const theme = useTheme();
    const parent = useRef<HTMLDivElement>(null);
    const rectElement = useRef<HTMLDivElement>(null);

    const [lastPeressed, setLastPressed] = useState(location.pathname);
    const [lastTop, setLastTop] = useState(-1);
    const [currentElement, setCurrentElement] = useState<HTMLDivElement | null>(null);

    const isCurrentRoute = (path: string) => {
        return path.includes(lastPeressed) || lastPeressed.includes(path);;
    }

    const routePressed = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, route: Route) => {
        props.routePressed(route);
        setLastPressed(route.path);
    };

    useEffect(() => {
        if (currentElement) {
            moveCaretPosition(currentElement, 6);
        }
    });

    useEffect(() => {
        if (currentElement) {
            moveCaretPosition(currentElement, 6);
        }
    }, []);

    const moveCaretPosition = (targetElement: Element, margin: number) => {
        const parentRect = parent.current?.getBoundingClientRect();
        const rect = targetElement.getBoundingClientRect();
        const style = rectElement.current?.style;

        if (!parentRect || !rectElement.current || !style || rect.top === lastTop) return;

        if (lastTop < rect.top) {
            setTimeout(() => (style.top = `${rect.top + margin}px`), 150);
            style.bottom = `calc(100% - ${rect.bottom - margin}px`;
        }
        else {
            setTimeout(() => (style.bottom = `calc(100% - ${rect.bottom - margin}px`), 150);
            style.top = `${rect.top + margin}px`;
        }

        setLastTop(rect.top);
    };

    return (
        <div ref={parent}>
            <List>
                <Typography
                    style={{ marginLeft: "12px", marginBottom: "0", color: theme.palette.grey[500] }}
                    variant="caption"
                >
                    Menu
                </Typography>
                {props.menus.map((route, index) => (
                    <Box
                        key={index}
                        margin="auto"
                        height="44px"
                        display="flex"
                        bgcolor={isCurrentRoute(route.path) ? "rgba(127,127,127,0.08)" : ""}
                    >
                        <ListItem button
                            ref={elem => isCurrentRoute(route.path) && setCurrentElement(elem)}
                            onClick={e => routePressed(e, route)}>
                            <ListItemIcon >
                                {route.icon}
                            </ListItemIcon>
                            <ListItemText primary={route.name} />
                        </ListItem>
                    </Box>
                ))}
            </List>
            <div ref={rectElement} style={{
                background: theme.palette.primary.main,
                width: "6px",
                transition: "all 0.3s",
                position: "absolute"
            }}></div>
        </div >
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            overflow: "hidden"
        },
        drawer: {
            [theme.breakpoints.up("sm")]: {
                width: drawerWidth,
                flexShrink: 0,
            },
            transition: theme.transitions.create(["width"], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        appBar: {
            zIndex: 9999,
        },
        toolbar: {
            marginRight: "12px",
            marginLeft: "12px",
            height: 60
        },
        drawerPaperOpen: {
            overflow: "auto",
            width: drawerWidth,
            border: 0,
            transition: theme.transitions.create(["width"], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerPaperClose: {
            overflow: "auto",
            width: closeWidth,
            border: 0,
            transition: theme.transitions.create(["width"], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(0),
            width: `calc(100vw - ${drawerWidth}px)`,
        },
        mainContainer: {
            height: "calc(100vh - 64px)",
            overflow: "hidden"
        }
    }),
);