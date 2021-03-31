import { Message, OnMessageSend } from "./index";
import React, { createRef, useState } from "react";
import style from "./style/SendMessage.scss";
import { IoSend } from "react-icons/io5";
import { FileAttachment } from "./FileAttachment";
import { AttachmentPreview } from "./AttachmentPreview";

interface Props {
    onSend?: OnMessageSend;
}

export function SendMessage(props: Props) {
    const inputField = createRef<HTMLTextAreaElement>();
    const [attachmentMessage, setAttachmentMessage] = useState<Message | null>(
        null
    );

    const handleSend = () => {
        if (inputField.current === null) return;
        if (inputField.current.value.trim().length <= 0) return;
        if (!props.onSend) return;

        props.onSend({
            text: inputField.current.value,
            createdAt: new Date(Date.now()),
            type: "text",
        });
        inputField.current.value = "";
    };

    const handleInputKey = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        handleSend();
    };

    const onFileChanged = (file: Message) => {
        setAttachmentMessage(file);
    };

    const onAttachmentPreviewClose = () => {
        setAttachmentMessage(null);
    };

    return (
        <div className={style.message_container}>
            <textarea ref={inputField} onKeyPress={handleInputKey} />
            <button onClick={handleSend} className={style.send}>
                <IoSend color="#FFFFFF" size={20} />
            </button>
            <FileAttachment onSelectFile={onFileChanged} />
            {attachmentMessage && (
                <AttachmentPreview
                    attachment={attachmentMessage}
                    onCancel={onAttachmentPreviewClose}
                />
            )}
        </div>
    );
}
