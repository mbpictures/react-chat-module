import React from "react";
import { Message } from "./Message";
import { MessageTyping } from "./MessageTyping";
import { MessageText } from "./MessageText";
import { MessagePhoto } from "./MessagePhoto";
import { MessageFile } from "./MessageFile";
import { MessageBubble } from "./MessageBubble";
import { MessageVideo } from "./MessageVideo";

export class MessageFactory {
    static makeInnerMessage(message: Message): JSX.Element | null {
        if (message.type === "typing") return <MessageTyping />;
        if (message.type === "text" && message.text)
            return <MessageText message={message} />;
        if (message.type === "photo") return <MessagePhoto message={message} />;
        if (message.type === "video") return <MessageVideo message={message} />;
        if (message.type === "file") return <MessageFile message={message} />;
        return null;
    }

    static makeMessage(message: Message, userId: string): JSX.Element {
        return (
            <MessageBubble userId={userId} message={message}>
                {MessageFactory.makeInnerMessage(message)}
            </MessageBubble>
        );
    }
}
