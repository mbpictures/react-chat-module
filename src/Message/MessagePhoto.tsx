import React from "react";
import { Message } from "./Message";
import style from "../style/MessagePhoto.scss";
import { MessageFactory } from "./MessageFactory";

interface Props {
    message: Message;
}

export function MessagePhoto(props: Props): JSX.Element {
    const textMessage = props.message;
    textMessage.type = "text";
    return (
        <div className={style.photo}>
            <img src={props.message.photo} />
            {MessageFactory.makeInnerMessage(textMessage)}
        </div>
    );
}
