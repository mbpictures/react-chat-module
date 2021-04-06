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

interface Props {
    userId: string;
    message: ChatMessage;
    additionalProps?: Record<string, any>;
    customFactories?: CustomFactories;
}

interface PropsInner {
    message: ChatMessage;
    additionalProps?: Record<string, any>;
    customFactories?: CustomFactories;
    disableText?: boolean;
}

type FactoryInstance = null | {
    element: JSX.Element | null;
    hasText: boolean;
};

type CreateFactoryInstanceFunction = (
    message: ChatMessage,
    additionalProps?: Record<string, any>,
    customFactories?: CustomFactories
) => FactoryInstance;

export const CreateDynamicFactoryInstance: CreateFactoryInstanceFunction = (
    message,
    additionalProps?,
    customFactories?
) => {
    if (!customFactories || !(message.type in customFactories)) return null;
    const Component = customFactories[message.type].factory;
    const element = React.createElement(Component, {
        message: message,
        ...additionalProps,
    });
    return {
        element: element,
        hasText: customFactories[message.type].hasText,
    };
};

export const CreateFactoryInstance: CreateFactoryInstanceFunction = (
    message,
    additionalProps
) => {
    if (message.type === "typing") {
        return {
            element: <MessageTyping />,
            hasText: false,
        };
    }
    if (message.type === "text") {
        return {
            element: <MessageText message={message} {...additionalProps} />,
            hasText: false,
        };
    }
    if (message.type === "image")
        return {
            element: <MessageImage message={message} {...additionalProps} />,
            hasText: true,
        };
    if (message.type === "video")
        return {
            element: <MessageVideo message={message} {...additionalProps} />,
            hasText: true,
        };
    if (message.type === "audio")
        return {
            element: <MessageAudio message={message} {...additionalProps} />,
            hasText: true,
        };
    if (message.type === "file")
        return {
            element: <MessageFile message={message} {...additionalProps} />,
            hasText: true,
        };

    console.warn("Debug: Using custom message type without factory!");
    return null;
};

export const MessageFactory: FunctionComponent<PropsInner> = (
    props: PropsInner
) => {
    const { customFactories, additionalProps, disableText } = props;

    const factoryInstance =
        CreateDynamicFactoryInstance(
            props.message,
            additionalProps,
            customFactories
        ) || CreateFactoryInstance(props.message, additionalProps);

    if (!factoryInstance) return null;

    const message = Object.assign({}, props.message);
    message.type = "text";
    const text =
        message.text !== undefined &&
        (!disableText ? factoryInstance.hasText : false) ? (
            <MessageFactory
                message={message}
                customFactories={customFactories}
            />
        ) : null;
    return (
        <div style={{ width: "100%" }}>
            {factoryInstance.element}
            {text}
        </div>
    );
};

export const MessageFactoryBubble: FunctionComponent<Props> = (
    props: Props
) => {
    return (
        <MessageBubble
            userId={props.userId}
            message={props.message}
            key={props.message.messageId}
        >
            <MessageFactory
                message={props.message}
                customFactories={props.customFactories}
            />
        </MessageBubble>
    );
};
