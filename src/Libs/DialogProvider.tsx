import { Dialog, DialogProps, Grow } from "@material-ui/core";
import { TransitionHandlerProps, TransitionProps } from "@material-ui/core/transitions";
import React, { useContext, useState } from "react";
import { render } from "react-dom";

export const DialogContext = React.createContext({
    close: () => { },
    open: (target: React.ReactNode) => { },
    setOption: (option: DialogOption) => { }
});

export type DialogOption = Omit<DialogProps, "open">;

const Provider = DialogContext.Provider;

interface DialogProvider {
    children: React.ReactNode | React.ReactNodeArray;
    keepMounted?: boolean;
}

export const DialogProvider = (props: DialogProvider) => {
    const [isOpen, setIsOpen] = useState(false);
    const [renderTarget, setRenderTarget] = useState<React.ReactNode>(<div>initial</div>);

    const [option, setOption] = useState<DialogOption | undefined>();

    const { keepMounted } = props;
    const handler = {
        close: () => {
            setIsOpen(false);
            setRenderTarget(null);
        },
        open: (target: React.ReactNode) => {
            setRenderTarget(target);
            setIsOpen(true);
        },
        setOption: (option: DialogOption) => {
            setOption(option);
        }
    };

    return (
        <Provider
            value={handler}
        >
            {props.children}
            <Dialog
                {...option}
                TransitionComponent={option?.TransitionComponent ?? Grow}
                keepMounted={keepMounted}
                open={isOpen}
            >
                {renderTarget}
            </Dialog>
        </Provider>
    );
};