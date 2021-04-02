import React from "react";
import style from "../style/AttachmentPreview.scss";
import { Message } from "../Message/Message";
import { IoCloseOutline } from "react-icons/io5";
import { Input } from "../Input";

interface Props {
    attachment: Message;
    onCancel: () => any;
}

export function AttachmentPreview(props: Props) {
    return (
        <div className={style.attachment_preview}>
            <div className={style.header}>
                <span>Preview</span>
                <button onClick={props.onCancel}>
                    <IoCloseOutline />
                </button>
            </div>
            <div>

            </div>
            <div className={style.message}>
                <Input allowEmptyMessages />
            </div>
        </div>
    );
}
