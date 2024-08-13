import { Message, OnMessageSend } from "./index";
import React, { FunctionComponent, useEffect, useState } from "react";
import style from "./style/SendMessage.scss";
import { FileAttachment, FileType } from "./Attachment/FileAttachment";
import { AttachmentPreview } from "./Attachment/AttachmentPreview/AttachmentPreview";
import { Input } from "./Input";
import { CustomFactories } from "./Message/MessageFactory";

interface Props {
    onSend?: OnMessageSend;
    loadingSpinner?: JSX.Element;
    buttons?: Partial<SendMessageButtons>;
    customFactories?: CustomFactories;
    disableAttachments?: boolean;
    attachmentFileTypes?: Array<FileType>;
    isUploading?: boolean;
    dropAttachment?: Message;
}

export interface SendMessageButtons {
    send: JSX.Element;
}

export const SendMessage: FunctionComponent<Props> = (props: Props) => {
    const [attachmentMessage, setAttachmentMessage] = useState<Message | null>(
        null
    );

    useEffect(() => {
        if (!props.dropAttachment) return;
        setAttachmentMessage(props.dropAttachment);
    }, [props.dropAttachment]);

    const onFileChanged = (file: Message) => {
        setAttachmentMessage(file);
    };

    const onAttachmentPreviewClose = () => {
        setAttachmentMessage(null);
    };

    return (
        <div className={style.message_container}>
            <Input onSend={props.onSend} sendButton={props.buttons?.send} />
            {!(props.disableAttachments ?? false) && (
                <FileAttachment
                    onSelectFile={onFileChanged}
                    attachmentFileTypes={props.attachmentFileTypes}
                    loadingSpinner={props.loadingSpinner}
                    isUploading={props.isUploading}
                />
            )}
            {attachmentMessage && (
                <AttachmentPreview
                    attachment={attachmentMessage}
                    onCancel={onAttachmentPreviewClose}
                    onSend={props.onSend}
                    loadingSpinner={props.loadingSpinner}
                    customFactories={props.customFactories}
                />
            )}
        </div>
    );
};
