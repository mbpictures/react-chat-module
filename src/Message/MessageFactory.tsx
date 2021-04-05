import React, { ComponentClass, FunctionComponent } from "react";
import { ChatMessage } from "./Message";
import { MessageTyping } from "./FactoryClasses/MessageTyping";
import { MessageText } from "./FactoryClasses/MessageText";
import { MessageImage } from "./FactoryClasses/MessageImage";
import { MessageFile } from "./FactoryClasses/MessageFile";
import { MessageBubble } from "./FactoryClasses/MessageBubble";
import { MessageVideo } from "./FactoryClasses/MessageVideo";
import { MessageAudio } from "./FactoryClasses/MessageAudio";

export interface MessageProp {
    message: ChatMessage;
}

export interface CustomFactory {
    hasText: boolean;
    factory: FunctionComponent<MessageProp> | ComponentClass<MessageProp>;
}

export type CustomFactories = Record<string, CustomFactory>;

export class MessageFactory {
    static makeInnerMessage(
        message: ChatMessage,
        customFactories?: CustomFactories,
        props?: Record<string, any>,
        disableText = false
    ): JSX.Element | null {
        if (
            customFactories &&
            message.type in customFactories &&
            !customFactories[message.type].hasText
        ) {
            const Component = customFactories[message.type].factory;
            return React.createElement(Component, {
                message: message,
                ...props,
            });
        }

        if (message.type === "typing") return <MessageTyping />;
        if (message.type === "text")
            return <MessageText message={message} {...props} />;

        let fillElement = null;
        // priories custom factory
        if (customFactories && message.type in customFactories) {
            const Component = customFactories[message.type].factory;
            fillElement = React.createElement(Component, {
                message: message,
                ...props,
            });
        } else {
            if (message.type === "image")
                fillElement = <MessageImage message={message} {...props} />;
            if (message.type === "video")
                fillElement = <MessageVideo message={message} {...props} />;
            if (message.type === "audio")
                fillElement = <MessageAudio message={message} {...props} />;
            if (message.type === "file")
                fillElement = <MessageFile message={message} {...props} />;
        }

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

    static makeMessage(
        message: ChatMessage,
        userId: string,
        customFactories?: CustomFactories
    ): JSX.Element {
        return (
            <MessageBubble
                userId={userId}
                message={message}
                key={message.messageId}
            >
                {MessageFactory.makeInnerMessage(message, customFactories)}
            </MessageBubble>
        );
    }
}
