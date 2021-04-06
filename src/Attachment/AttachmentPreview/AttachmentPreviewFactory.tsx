import { ChatMessage, Message } from "../../Message/Message";
import { CustomFactories, MessageFactory } from "../../Message/MessageFactory";
import React from "react";

export class AttachmentPreviewFactory {
    static makeAttachmentPreview(
        message: Message,
        blob?: string,
        customFactories?: CustomFactories
    ): JSX.Element | null {
        if (!message.attachment || !blob) return null;
        const chatMessage: ChatMessage = Object.assign(
            {},
            message
        ) as ChatMessage;
        let filetype;
        chatMessage.file = {
            file: blob,
            fileName: message.attachment.name,
            fileType:
                (filetype = message.attachment.name.split(".").pop()) !==
                undefined
                    ? filetype
                    : "",
        };
        chatMessage.audio = blob;
        chatMessage.photo = blob;
        chatMessage.video = blob;

        return (
            <MessageFactory
                message={chatMessage}
                customFactories={customFactories}
                additionalProps={{ hideDownload: true }}
                disableText
            />
        );
    }
}
