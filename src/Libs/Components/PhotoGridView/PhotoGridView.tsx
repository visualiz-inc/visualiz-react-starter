import React, { useEffect, useState } from "react";
import { makeStyles, Checkbox, useTheme } from "@material-ui/core";

interface PhotoGridViewProps {
    images: string[];
    itemHeight?: number;
    selected?: string[];
    multiSelect?: boolean;
    span?: number;
    hideCheckbox?: boolean;
    disableInvok?: boolean;
    disableSelection?: boolean;
    baseUrl?: string;
    selectionChanged?: (selected: string[]) => void;
    invoked?: (path: string) => void;
    slot?: (image: JSX.Element, item: string) => JSX.Element;
}

export function PhotoGridView(props: PhotoGridViewProps) {
    const { images, itemHeight, selected } = props;
    const classes = useStyle();
    const [selectedhash, setSelectedHash] = useState<{ [key: string]: boolean }>({});
    const theme = useTheme();

    useEffect(() => {
        setSelectedHash(
            selected?.reduce(
                (x, y) => ({
                    ...x,
                    [y]: true
                }),
                {} as { [key: string]: boolean }
            ) ?? {}
        );
    }, [selected]);

    function addToSelected(item: string) {
        if (!props.multiSelect) {
            props.selectionChanged && props.selectionChanged([item]);
        }
        else {
            props.selectionChanged && props.selectionChanged([...(selected ?? []), item]);
        }
    }

    function removeFromSelected(item: string) {
        props.selectionChanged && props.selectionChanged([...selected?.filter(e => e !== item) ?? []]);
    }

    function PhotoItem(p: { path: string }) {
        const { path } = p;
        const [isPointerEntered, setIsPointerEntered] = useState(false);

        return (
            <div
                className={classes.item}
                style={{
                    height: "100%",
                }}
                onPointerEnter={() => setIsPointerEntered(true)}
                onPointerLeave={() => setIsPointerEntered(false)}
            >
                <img
                    alt={path}
                    height={itemHeight ?? 160}
                    className={classes.img}
                    src={props.baseUrl + path}
                    style={{
                        top: "50%",
                        left: "50%",
                        objectFit: "cover",
                        transform: isPointerEntered ? "scale(1.1)" : ""
                    }}
                />
                <div className={classes.button}
                    style={{
                        outlineWidth: selectedhash[path] ? "4px" : "0px",
                        outlineColor: `${theme.palette.primary.main}`,
                        opacity: selected?.length ? "1" : undefined,
                        background: selected?.length && !selectedhash[path] ? "rgba(0, 0, 0, 0.26)" : undefined,
                    }}
                    onClick={e => {
                        if (!selected?.length && !props.disableInvok || props.disableSelection) {
                            props.invoked && props.invoked(p.path);
                        }
                        else {
                            selectedhash[path] ? removeFromSelected(path) : addToSelected(path);
                        }
                    }}
                >
                    {
                        !props.hideCheckbox && !props.disableSelection && <Checkbox
                            color="primary"
                            className={classes.checkbox}
                            checked={!!selectedhash[path]}
                            onClick={e => e.stopPropagation()}
                            onChange={e => {
                                if (selectedhash[path]) {
                                    removeFromSelected(path);
                                }
                                else {
                                    addToSelected(path);
                                }
                            }}
                        />
                    }
                </div>
            </div>
        );
    }

    return (
        <div className={classes.container} style={{ padding: `${props.span ?? 2}px` }}>
            {
                images.map(path => (
                    <div
                        key={path}
                        className={classes.photo}
                        style={{
                            height: itemHeight ? `${itemHeight}px` : "120px",
                            padding: `${props.span ?? 2}px`,
                        }}
                    >
                        {
                            props.slot
                                ?
                                props.slot(<PhotoItem path={path} />, path)
                                :
                                <PhotoItem path={path} />
                        }
                    </div>
                ))
            }
            {/* spacer */}
            <div style={{ flexGrow: 999999999 }} />
        </div>
    );
}

const useStyle = makeStyles(() => ({
    checkbox: {
        position: "absolute",
        top: "0px",
        right: "0px"
    },
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    item: {
        position: "relative",
        overflow: "hidden",
    },
    photo: {
        display: "block",
        flexGrow: 1
    },
    button: {
        "overflow": "hidden",
        "transition": "all 0.25s",
        "position": "absolute",
        "top": "4px",
        "right": "4px",
        "bottom": "4px",
        "left": "4px",
        "opacity": "0",
        "outlineStyle": "solid",
        "&:hover": {
            opacity: "1",
        },
        "cursor": "pointer"
    },
    img: {
        height: "100%",
        WebkitUserSelect: "none",
        transition: "transform 0.4s",
        minWidth: "100%"
    }
}));