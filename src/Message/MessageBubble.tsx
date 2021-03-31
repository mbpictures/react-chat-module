import React, { createRef, useEffect, useState } from "react";
import style from "../style/MessageBubble.scss";
import { ChatMessage } from "./Message";

interface Props {
    children?: JSX.Element | null;
    userId: string;
    message: ChatMessage;
}

export function MessageBubble(props: Props) {
    const containerRef = createRef<HTMLDivElement>();
    const [messageRead, setMessageRead] = useState<boolean>();

    const senderClass =
        props.userId === props.message.senderId
            ? style.from_me
            : style.from_them;
    const classNames = style.message + " " + senderClass;

    useEffect(() => {
        if (props.message.read === undefined || props.message.read) {
            setMessageRead(true);
            return;
        }
        setTimeout(() => {
            setMessageRead(true);
        }, 100);
    }, []);
    let animationClass = messageRead ? style.animated_in : "";
    animationClass +=
        props.message.read === undefined ? " " + style.not_animated : "";

    return (
        <div
            className={`${style.message_container} ${senderClass} ${animationClass}`}
            ref={containerRef}
        >
            <div className={classNames}>{props.children}</div>
            <div className={style.time}>
                {props.message.createdAt.toLocaleTimeString()}
            </div>
        </div>
    );
}
