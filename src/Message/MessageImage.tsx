import React from "react";
import { ChatMessage } from "./Message";
import style from "../style/MessagePhoto.scss";
import { MessageFactory } from "./MessageFactory";

interface Props {
    message: ChatMessage;
}

export function MessageImage(props: Props): JSX.Element {
    const textMessage: ChatMessage = {
        createdAt: props.message.createdAt,
        type: "text",
        text: props.message.text,
        senderId: props.message.senderId,
        messageId: props.message.messageId,
        profilePicture: props.message.profilePicture,
    };
    return (
        <div className={style.photo}>
            <img src={props.message.photo} />
            {MessageFactory.makeInnerMessage(textMessage)}
        </div>
    );
}
