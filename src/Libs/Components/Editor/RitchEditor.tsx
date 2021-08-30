import React, { Suspense, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { Box, Menu } from "@material-ui/core";
import { FileDropArea } from "../FileDropArea";
import { CSSProperties } from "@material-ui/styles";
import Axios from "axios";

interface RitchEditorProps {
    content: string;
    contentChanged: (e: string) => void;
    style?: CSSProperties;
}

const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],        // toggled buttons
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],      // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }],          // outdent/indent
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }],          // dropdown with defaults from theme
    ["image"],
    [{ align: [] }],
    ["clean"]                                         // remove formatting button
];

const Empty = () => <div></div>;
const isSsr = typeof window === "undefined";

const Quill = React.lazy(
    () => isSsr ?
        Promise.resolve({
            default: Empty
        }) :
        import("react-quill") as any
);


export class RitchEditor extends React.Component<RitchEditorProps, {
    ancher: HTMLElement | null;
    image: string;
}> {
    quillRef: any = null;
    parent: any = null;

    module = {
        toolbar: {
            container: toolbarOptions,
            handlers: {
                image: this.imageHandler.bind(this)
            }
        },
    }

    constructor(p: RitchEditorProps) {
        super(p);
        this.state = {
            image: "",
            ancher: null
        };
    }

    async imageHandler(e: any, f: any) {
        this.setState({ ...this.state, ancher: this.parent });
    }

    async commited(file: File | null) {
        this.setState({ ...this.state, ancher: null });
        if (!file) return;

        const data = new FormData();
        data.append("file", file);
        const result = await Axios.post<string>("/api/media", data);
        const image = result.data;
        this.setState({ ...this.state, image })

        const quill = this.quillRef?.getEditor();
        if (!quill) {
            return;
        }
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, "image", image);
    }

    async changed(file: File | null) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            this.setState({
                ...this.state,
                image: reader.result as string
            });
        };
        reader.readAsDataURL(file);
    }

    render() {
        return (
            <div ref={r => this.parent = r} style={{ height: "100%" }}>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.ancher}
                    keepMounted
                    open={!!this.state.ancher}
                    onClose={() => this.setState({ ...this.state, ancher: null })}
                >
                    <Box p={2}>
                        <FileDropArea
                            showCommand
                            onClear={() => this.setState({
                                ...this.state,
                                image: ""
                            })}
                            commited={this.commited.bind(this)}
                            onChange={this.changed.bind(this)}
                            image={this.state.image}
                        />
                    </Box>
                </Menu>
                <Quill
                    style={this.props.style}
                    ref={(el: any) => {
                        this.quillRef = el;
                    }}
                    value={this.props.content}
                    theme="snow"
                    modules={this.module}
                    onChange={e => this.props.contentChanged(e)}
                />
            </div>
        );
    }
}