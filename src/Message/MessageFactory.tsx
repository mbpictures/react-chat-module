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
    static makeInnerMessage(message: ChatMessage): JSX.Element | null {
        console.log(message.type);
        if (message.type === "typing") return <MessageTyping />;
        if (message.type === "text" && message.text)
            return <MessageText message={message} />;
        let fillElement = null;
        if (message.type === "image")
            fillElement = <MessageImage message={message} />;
        if (message.type === "video")
            fillElement = <MessageVideo message={message} />;
        if (message.type === "audio")
            fillElement = <MessageAudio message={message} />;
        if (message.type === "file")
            fillElement = <MessageFile message={message} />;
        message.type = "text";
        const text =
            message.text !== undefined ? this.makeInnerMessage(message) : null;
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
