import React from "react";
import { Message } from "./Message";
import { MessageFactory } from "./MessageFactory";
import style from "../style/MessageAudio.scss";

interface Props {
    message: Message;
}

export function MessageAudio(props: Props): JSX.Element {
    const textMessage: Message = {
        createdAt: props.message.createdAt,
        type: "text",
        text: props.message.text,
        senderId: props.message.senderId,
        messageId: props.message.messageId,
        profilePicture: props.message.profilePicture,
    };
    return (
        <div className={style.message_audio}>
            <audio src={props.message.audio} controls />
            {MessageFactory.makeInnerMessage(textMessage)}
        </div>
    );
}
