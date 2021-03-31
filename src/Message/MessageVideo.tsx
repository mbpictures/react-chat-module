import React from "react";
import { ChatMessage } from "./Message";
import { MessageFactory } from "./MessageFactory";
import style from "../style/MessageVideo.scss";

interface Props {
    message: ChatMessage;
}

export function MessageVideo(props: Props): JSX.Element {
    const textMessage: ChatMessage = {
        createdAt: props.message.createdAt,
        type: "text",
        text: props.message.text,
        senderId: props.message.senderId,
        messageId: props.message.messageId,
        profilePicture: props.message.profilePicture,
    };
    return (
        <div className={style.message_video}>
            <video src={props.message.video} controls />
            {MessageFactory.makeInnerMessage(textMessage)}
        </div>
    );
}
