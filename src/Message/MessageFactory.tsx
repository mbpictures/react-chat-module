import React from "react";
import { ChatMessage } from "./Message";
import { MessageTyping } from "./FactoryClasses/MessageTyping";
import { MessageText } from "./FactoryClasses/MessageText";
import { MessageImage } from "./FactoryClasses/MessageImage";
import { MessageFile } from "./FactoryClasses/MessageFile";
import { MessageBubble } from "./FactoryClasses/MessageBubble";
import { MessageVideo } from "./FactoryClasses/MessageVideo";
import { MessageAudio } from "./FactoryClasses/MessageAudio";

export class MessageFactory {
    static makeInnerMessage(
        message: ChatMessage,
        props?: Record<string, any>,
        disableText = false
    ): JSX.Element | null {
        if (message.type === "typing") return <MessageTyping />;
        if (message.type === "text" && message.text)
            return <MessageText message={message} {...props} />;
        let fillElement = null;
        if (message.type === "image")
            fillElement = <MessageImage message={message} {...props} />;
        if (message.type === "video")
            fillElement = <MessageVideo message={message} {...props} />;
        if (message.type === "audio")
            fillElement = <MessageAudio message={message} {...props} />;
        if (message.type === "file")
            fillElement = <MessageFile message={message} {...props} />;

        message = Object.assign({}, message);
        message.type = "text";
        const text =
            message.text !== undefined && !disableText
                ? this.makeInnerMessage(message, props)
                : null;
        return (
            <div style={{ width: "100%" }}>
                {fillElement}
                {text}
            </div>
        );
    }

    static makeMessage(message: ChatMessage, userId: string): JSX.Element {
        return (
            <MessageBubble
                userId={userId}
                message={message}
                key={message.messageId}
            >
                {MessageFactory.makeInnerMessage(message)}
            </MessageBubble>
        );
    }
}
