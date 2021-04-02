import React, { useEffect, useState } from "react";
import style from "../../style/AttachmentPreview.scss";
import { Message } from "../../Message/Message";
import { IoCloseOutline } from "react-icons/io5";
import { Input } from "../../Input";
import { AttachmentPreviewFactory } from "./AttachmentPreviewFactory";
import { LoadingIndicator } from "../../LoadingIndicator";

interface Props {
    attachment: Message;
    onCancel: () => any;
}

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

export function AttachmentPreview(props: Props) {
    const [file, setFile] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!props.attachment.attachment) return;
        const reader = new FileReader();
        reader.readAsDataURL(props.attachment.attachment);
        reader.onloadend = () => {
            if (reader.result === null) return;
            const result =
                typeof reader.result === "string"
                    ? reader.result
                    : arrayBufferToBase64(reader.result);
            setFile(result);
        };
    }, []);

    const onCancel = () => {
        setFile(undefined); // clean up reference
        props.onCancel();
    };

    return (
        <div className={style.attachment_preview}>
            <div className={style.header}>
                <span>Preview</span>
                <button onClick={onCancel}>
                    <IoCloseOutline />
                </button>
            </div>
            <div className={style.preview}>
                {file === undefined && <LoadingIndicator />}
                {file !== undefined &&
                    AttachmentPreviewFactory.makeAttachmentPreview(
                        props.attachment,
                        file
                    )}
            </div>
            <div className={style.message}>
                <Input allowEmptyMessages />
            </div>
        </div>
    );
}
