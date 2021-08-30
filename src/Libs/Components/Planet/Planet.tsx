// prettier-ignore
import { ClickAwayListener, makeStyles } from "@material-ui/core";
import { CreateCSSProperties, CSSProperties } from "@material-ui/styles";
import * as React from "react";
import useResizeObserver from "use-resize-observer";
import { Orbit } from "./Orbit";
import { Satellite } from "./Satellite";

const DEFAULT_MASS = 1;
const DEFAULT_TENSTION = 500;
const DEFAULT_FRICTION = 17;
const DEFAULT_ROTATION = 0;
const DEFAULT_OBITRADIUS = 90;
const DEFAULT_RADIUS = 60;

interface Props {
    centerContent?: React.ReactNode;
    children?: React.ReactNode;
    open?: boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    mass?: number;
    tension?: number;
    friction?: number;
    orbitStyle?: (
        defaultStyle: CSSProperties | CreateCSSProperties<{}>
    ) => CSSProperties | CreateCSSProperties<{}>;
    orbitRadius?: number;
    radius?: number;
    rotation?: number;
    color?: string;
    angle?: number;
    hideOrbit?: boolean;
    autoClose?: boolean;
    onClose?: (
        e: React.MouseEvent<Document | HTMLDivElement, MouseEvent>
    ) => void;
    dragablePlanet?: boolean;
    dragRadiusPlanet?: number;
    elevation?: number;
    dragableSatellites?: boolean;
    dragRadiusSatellites?: number;
    bounceRadius?: number;
    bounce?: boolean;
    bounceOnOpen?: boolean;
    bounceOnClose?: boolean;
    bounceDirection?: "TOP" | "BOTTOM" | "LEFT" | "RIGHT";
    satelliteOrientation?: "DEFAULT" | "INSIDE" | "OUTSIDE" | "READABLE";
}

export function Planet(props: Props) {
    const {
        centerContent,
        children,
        open,
        onClick,
        mass,
        tension,
        friction,
        orbitRadius,
        radius,
        rotation,
        orbitStyle,
        hideOrbit,
        onClose,
        autoClose,
        angle,
        color,
        dragableSatellites,
        dragRadiusSatellites,
        elevation,
        satelliteOrientation,
    } = props;
    const classes = useStyles(props);
    const { ref, height = 0, width = 0 } = useResizeObserver();
    const [_open, setOpen] = React.useState(!!open);

    React.useEffect(() => {
        if (!!open !== _open) {
            setOpen(!!open);
        }
    }, [open]);

    var satellites: (() => React.ReactElement)[] = [];
    var satelliteCount = React.Children.count(children);
    React.Children.forEach(children, (c, i) => {
        satellites[i] = () => (
            <Satellite
                angle={angle ?? 360}
                key={i}
                index={i}
                open={_open}
                satelliteCount={satelliteCount}
                planetHeight={height}
                planetWidth={width}
                mass={mass ? mass : DEFAULT_MASS}
                friction={friction ? friction : DEFAULT_FRICTION}
                tension={tension ? tension : DEFAULT_TENSTION}
                orbitRadius={radius ? radius : DEFAULT_RADIUS}
                rotation={rotation ? rotation : DEFAULT_ROTATION}
                dragable={!!dragableSatellites}
                dragRadius={dragRadiusSatellites}
                orientation={satelliteOrientation}
            >
                {c}
            </Satellite>
        );
    });

    const onPlanet = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (onClick) {
            onClick(e);
        }
        else {
            if (_open && autoClose) {
                setOpen(false);
                if (onClose) {
                    onClose(e);
                }
            }
            else {
                setOpen(true);
            }
        }
    };

    const onClickAway = (e: React.MouseEvent<Document, MouseEvent>) => {
        if (autoClose && _open) {
            setOpen(false);
        }

        if (onClose && _open) {
            onClose(e);
        }
    };

    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <div className={classes.root}>
                {!hideOrbit && _open && (
                    <Orbit
                        elevation={elevation ?? 2}
                        color={color ?? "transpalent"}
                        open={_open}
                        orbitStyle={orbitStyle}
                        planetHeight={height}
                        planetWidth={width}
                        mass={mass ? mass : DEFAULT_MASS}
                        friction={friction ? friction : DEFAULT_FRICTION}
                        tension={tension ? tension : DEFAULT_TENSTION}
                        orbitRadius={orbitRadius ? orbitRadius : DEFAULT_OBITRADIUS}
                    />
                )}
                {
                    _open && (
                        <>{satellites.map(e => e())}</>
                    )
                }
                <div className={classes.planetContent} onClick={onPlanet}>
                    <div ref={ref as any}>{centerContent}</div>
                </div>
            </div>
        </ClickAwayListener>
    );
}

const useStyles = makeStyles({
    root: {
        position: "relative",
    },

    planetContent: {
        position: "absolute",
        zIndex: 1,
    },
});
