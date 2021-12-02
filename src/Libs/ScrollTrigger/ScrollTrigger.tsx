import { useScrollContext } from "./contexts";
import { Marker } from "./debug";
import { Transition, TransitionStatus } from 'react-transition-group';
import React, { CSSProperties, ReactNode, useEffect, useState } from "react";
import { useScrollTrigger } from "./useScrollTrigger";
import { css } from "@mui/styled-engine";

interface ScrollInfo {
    scrollDirection: "up" | "down";
    scrollProgress: number;
    isOverlap: boolean;
}

interface ScrollTriggerProps {
    children: ((status: TransitionStatus, scrollInfo: ScrollInfo) => ReactNode);
    delay?: number;
    once?: boolean;
    forceIn?: boolean;
    scrollStartOffset?: number | string;
    scrollEndOffset?: number | string;
    className?: string;
    style?: CSSProperties;
}

export const ScrollTrigger = (props: ScrollTriggerProps) => {
    const [me, setMe] = useState<HTMLDivElement | null>(null);
    const context = useScrollContext();
    const trigger = useScrollTrigger({
        target: me ?? undefined,
        scrollStartOffset: props.scrollStartOffset,
        scrollEndOffset: props.scrollEndOffset,
    });
    const [mount, setMount] = useState(false);

    useEffect(() => {
        if (!trigger.isOverlap && props.once) {
            return;
        }
        setMount(trigger.isOverlap);
    }, [trigger]);

    useEffect(() => {
        if (props.forceIn) {
            setMount(true);
        }
    }, []);

    return (
        <div
            css={css({
                position: "relative",
            })}
            className={props.className}
            style={{ ...props.style } as any}
            ref={raw => {
                if (raw) {
                    setMe(raw);
                }
            }}
        >
            <Transition
                in={mount}
                timeout={props.delay ?? 0}
            >
                {state => props.children(state, trigger)}
            </Transition>
            {/* end */}

            {
                context.debug && <Marker
                    scrollEndOffset={props.scrollEndOffset}
                    scrollStartOffset={props.scrollStartOffset}
                    target={me ?? undefined}
                    container={context.rawElement}
                />
            }
        </div>
    );
};
