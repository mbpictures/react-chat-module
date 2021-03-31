import React from "react";
import style from "./style/FileButton.scss";
import { FileType } from "./Attachment";

interface Props {
    children?: JSX.Element;
    fileType: FileType;
    onSelect?: (file: File) => unknown;
    color: string;
}

export function FileButton(props: Props): JSX.Element {
    const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file =
            event.target.files !== null && event.target.files.length > 0
                ? event.target.files[0]
                : null;
        if (file === null) return;
        let fileTypeMatches;
        switch (props.fileType) {
            case "audio":
                fileTypeMatches = file.type.match("audio.*");
                break;
            case "video":
                fileTypeMatches = file.type.match("video.*");
                break;
            case "image":
                fileTypeMatches = file.type.match("image.*");
                break;
            case "document":
                fileTypeMatches = file.type === "application/pdf";
                break;
            case "any":
                fileTypeMatches = true;
        }
        if (!fileTypeMatches) return;
        if (!props.onSelect) return;
        props.onSelect(file);
    };

    return (
        <label
            className={style.file_button}
            style={{
                backgroundColor: props.color,
            }}
        >
            <div className={style.darken} />
            <input type="file" onChange={onChangeFile} />
            {props.children}
        </label>
    );
}
