import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";

const useStyles = makeStyles({
    spacer: {
        flex: "1 1 auto"
    }
})

export function Spacer() {
    const classes = useStyles();

    return (
        <div className={classes.spacer} />
    );
}