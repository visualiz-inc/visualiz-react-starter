import { DialogProps } from "@material-ui/core";
import { useContext } from "react";
import { DialogContext, DialogOption } from "./DialogProvider";

type DialogRenderer<TResult>
    = (close: (result: TResult) => void) => React.ReactNode;

interface DialogHandler {
    showAsync: <TResult = any>(renderer: DialogRenderer<TResult>, options?: DialogOption)
        => Promise<TResult>;
    setOption: (option: DialogOption) => void;
}

export const useDialog = (): DialogHandler => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error("DialogProvider is not registered.");
    }

    return {
        showAsync: <TResult = any>(renderer: DialogRenderer<TResult>) => {
            if (!renderer) {
                throw new Error("renderer is undefined.");
            }

            return new Promise<TResult>(
                resolve => {
                    const onClose = (result: TResult) => {
                        context.close();
                        resolve(result);
                    };

                    const ctx = renderer(onClose);
                    context.open(ctx);
                }
            );
        },
        setOption: (option: DialogOption) => {
            context.setOption(option);
        }
    };
};
