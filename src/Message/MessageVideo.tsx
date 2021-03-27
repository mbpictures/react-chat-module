import React from "react";
import { Message } from "./Message";
import { MessageFactory } from "./MessageFactory";

interface Props {
    message: Message;
}

export function MessageVideo(props: Props): JSX.Element {
    const textMessage: Message = {
        createdAt: props.message.createdAt,
        type: "text",
        text: props.message.text,
        senderId: props.message.senderId,
        messageId: props.message.messageId,
        profilePicture: props.message.profilePicture,
    };
    return (
        <div>
            <video src={props.message.video} />
            {MessageFactory.makeInnerMessage(textMessage)}
        </div>
    );
}
