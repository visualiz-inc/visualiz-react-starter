// prettier-ignore
import { makeStyles } from "@material-ui/core";
import * as React from "react";
import { animated, useSpring } from "react-spring";
import useResizeObserver from "use-resize-observer";

interface Props {
    index: number;
    angle: number;
    open: boolean;
    satelliteCount: number;
    children?: React.ReactNode;
    planetWidth: number;
    planetHeight: number;
    mass: number;
    tension: number;
    friction: number;
    orbitRadius: number;
    rotation: number;
    dragable: boolean;
    dragRadius?: number;
    orientation?: "DEFAULT" | "INSIDE" | "OUTSIDE" | "READABLE";
}

export function Satellite(props: Props) {
    const {
        children,
        index,
        satelliteCount,
        open,
        planetWidth,
        planetHeight,
        tension,
        friction,
        mass,
        orbitRadius,
        rotation,
        orientation,
        angle
    } = props;
    const classes = useStyles(props);
    const { ref, height = 0, width = 0 } = useResizeObserver();
    const position = useSpring({
        reverse: !open,
        from: getInitalSatellitePosition(width, height, planetWidth, planetHeight),
        to: getFinalSatellitePosition(
            index,
            satelliteCount,
            width,
            height,
            planetWidth,
            planetHeight,
            orbitRadius,
            rotation,
            angle,
            orientation
        ),
        config: { mass, tension, friction },
    });

    return (
        <animated.div className={classes.root} style={position}>
            <div ref={ref as any}>{children}</div>
        </animated.div>
    );
}

function getFinalSatellitePosition(
    index: number,
    satelliteCount: number,
    width: number,
    height: number,
    planetWidth: number,
    planetHeight: number,
    orbitRadius: number,
    rotation: number,
    deg: number,
    orientation: "DEFAULT" | "INSIDE" | "OUTSIDE" | "READABLE" | undefined
) {
    const { deltaX, deltaY, angle } = getFinalDeltaPositions(
        index,
        satelliteCount,
        width,
        height,
        orbitRadius,
        rotation,
        deg
    );

    let transform = {};
    switch (orientation) {
        case "OUTSIDE":
            transform = { transform: "rotate(" + angle + "deg)" };
            break;
        case "INSIDE":
            transform = { transform: "rotate(" + (angle + 180) + "deg)" };
            break;
        case "READABLE":
            transform =
                angle > 90 && angle < 270
                    ? { transform: "rotate(" + (angle + 180) + "deg)" }
                    : { transform: "rotate(" + angle + "deg)" };
            break;
        default:
            transform = { transform: "rotate(" + 0 + "deg)" };
    }

    return {
        top: planetHeight / 2 + deltaX,
        left: planetWidth / 2 - deltaY,
        opacity: 1,
        ...transform,
    };
}

function getInitalSatellitePosition(
    width: number,
    height: number,
    planetWidth: number,
    planetHeight: number
) {
    return {
        top: planetHeight / 2 - height / 2,
        left: planetWidth / 2 - width / 2,
        opacity: 0,
    };
}

function getFinalDeltaPositions(
    index: number,
    satelliteCount: number,
    width: number,
    height: number,
    orbitRadius: number,
    rotation: number,
    angle: number
) {
    const SEPARATION_ANGLE = angle / satelliteCount;
    const FAN_ANGLE = (satelliteCount - 1) * SEPARATION_ANGLE;
    const BASE_ANGLE = (180 - FAN_ANGLE) / 2 + 90 + rotation;

    const TARGET_ANGLE = BASE_ANGLE + index * SEPARATION_ANGLE;
    return {
        deltaX: orbitRadius * Math.cos(toRadians(TARGET_ANGLE)) - height / 2,
        deltaY: orbitRadius * Math.sin(toRadians(TARGET_ANGLE)) + width / 2,
        angle: TARGET_ANGLE,
    };
}

const useStyles = makeStyles({
    root: (props: Props) => ({
        position: "absolute",
        zIndex: props.open ? 2 : 0,
    }),
});

// UTILITY FUNCTIONS
const DEG_TO_RAD = 0.0174533;
function toRadians(degrees: number) {
    return degrees * DEG_TO_RAD;
}
