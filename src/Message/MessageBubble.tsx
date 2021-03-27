import React from "react";
import style from "../style/MessageBubble.scss";
import { Message } from "./Message";

interface Props {
    children?: JSX.Element | null;
    userId: string;
    message: Message;
}

export function MessageBubble(props: Props) {
    const senderClass =
        props.userId === props.message.senderId
            ? style.from_me
            : style.from_them;
    const classNames = style.message + " " + senderClass;

    return (
        <div className={`${style.message_container} ${senderClass}`}>
            <div className={classNames}>{props.children}</div>
            <div className={style.time}>
                {props.message.createdAt.toLocaleTimeString()}
            </div>
        </div>
    );
}
