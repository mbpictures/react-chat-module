import { Message, OnMessageSend } from "./index";
import React, { useState } from "react";
import style from "./style/SendMessage.scss";
import { FileAttachment } from "./FileAttachment";
import { AttachmentPreview } from "./AttachmentPreview";
import { Input } from "./Input";

interface Props {
    onSend?: OnMessageSend;
}

export function SendMessage(props: Props) {
    const [attachmentMessage, setAttachmentMessage] = useState<Message | null>(
        null
    );

    const onFileChanged = (file: Message) => {
        setAttachmentMessage(file);
    };

    const onAttachmentPreviewClose = () => {
        setAttachmentMessage(null);
    };

    return (
        <div className={style.message_container}>
            <Input onSend={props.onSend} />
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
