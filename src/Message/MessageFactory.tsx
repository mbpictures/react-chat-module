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
        if (message.type === "typing") return <MessageTyping />;
        if (message.type === "text" && message.text)
            return <MessageText message={message} />;
        if (message.type === "image") return <MessageImage message={message} />;
        if (message.type === "video") return <MessageVideo message={message} />;
        if (message.type === "audio") return <MessageAudio message={message} />;
        if (message.type === "file") return <MessageFile message={message} />;
        return null;
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
