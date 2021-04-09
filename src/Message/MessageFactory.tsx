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

const DefaultFactories: CustomFactories = {
    typing: {
        hasText: false,
        factory: MessageTyping,
    },
    text: {
        hasText: false,
        factory: MessageText,
    },
    image: {
        hasText: true,
        factory: MessageImage,
    },
    video: {
        hasText: true,
        factory: MessageVideo,
    },
    audio: {
        hasText: true,
        factory: MessageAudio,
    },
    file: {
        hasText: true,
        factory: MessageFile,
    },
};

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

export const MessageFactory: FunctionComponent<PropsInner> = (
    props: PropsInner
) => {
    const { customFactories, additionalProps, disableText } = props;

    const factoryClasses = { ...DefaultFactories, ...customFactories };

    const factoryInstance = CreateDynamicFactoryInstance(
        props.message,
        additionalProps,
        factoryClasses
    );

    if (!factoryInstance) {
        console.warn("Debug: Using custom message type without factory!");
        return null;
    }

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
