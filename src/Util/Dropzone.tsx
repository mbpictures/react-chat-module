import React, { DragEventHandler, useState } from "react";
import style from "../style/Util/Dropzone.scss";
import { Message, MessageType } from "../Message/Message";

interface DropzoneResult {
    dropzoneContainerProps: {
        onDragOver: DragEventHandler;
        onDragLeave: DragEventHandler;
        onDrop: DragEventHandler;
    };
    feedbackContainer?: JSX.Element;
    message?: Message;
}

const FileTypeRegex: { [key in MessageType]?: RegExp } = {
    audio: /^audio.*$/,
    video: /^video.*$/,
    image: /^image.*$/,
    file: /^.*$/,
};

export const useDropzone: () => DropzoneResult = () => {
    const [fileInputOpen, setFileInputOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<Message | undefined>(undefined);

    const invokeFileChanged = (file: File): void => {
        const possibleTypes = Object.entries(FileTypeRegex).filter((val) =>
            val[1]?.test(file.type)
        );

        if (possibleTypes.length === 0) return;

        setMessage({
            type: possibleTypes[0][0] as MessageType,
            text: "",
            attachment: file,
            createdAt: new Date(Date.now()),
        });
    };

    const openDropzone = (): void => {
        setFileInputOpen(true);
    };

    const closeDropzone = (): void => {
        setFileInputOpen(false);
    };

    const onBeginDrag: DragEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        openDropzone();
    };

    const onFileDrag: DragEventHandler = (event) => {
        event.preventDefault();
        if (event.dataTransfer.files.length === 0) return;
        invokeFileChanged(event.dataTransfer.files[0]);
        closeDropzone();
    };

    return {
        dropzoneContainerProps: {
            onDrop: onFileDrag,
            onDragLeave: closeDropzone,
            onDragOver: onBeginDrag,
        },
        feedbackContainer: fileInputOpen ? (
            <div
                className={`${style.dropzone} ${
                    fileInputOpen ? style.open : ""
                }`}
            >
                <h2>Drag the file here</h2>
            </div>
        ) : undefined,
        message: message,
    };
};
