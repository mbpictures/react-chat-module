import { ChatMessage, Message } from "../../Message/Message";
import { MessageFactory } from "../../Message/MessageFactory";

export class AttachmentPreviewFactory {
    static makeAttachmentPreview(
        message: Message,
        blob?: string
    ): JSX.Element | null {
        if (!message.attachment || !blob) return null;
        const chatMessage: ChatMessage = message as ChatMessage;
        chatMessage.file = {
            file: blob,
            fileName: message.attachment.name,
            fileType: message.attachment.type,
        };
        chatMessage.audio = blob;
        chatMessage.photo = blob;
        chatMessage.video = blob;

        return MessageFactory.makeInnerMessage(chatMessage, true);
    }
}
