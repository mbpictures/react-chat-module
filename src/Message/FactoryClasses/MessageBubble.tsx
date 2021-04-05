import React, { createRef, FunctionComponent, useEffect, useState } from "react";
import style from "../../style/Message/MessageBubble.scss";
import { MessageProp } from "../MessageFactory";

interface Props extends MessageProp {
    children?: JSX.Element | null;
    userId: string;
}

export const MessageBubble: FunctionComponent<Props> = (props: Props) => {
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
            {props.message.profilePicture && (
                <div className={style.profile_picture}>
                    <img src={props.message.profilePicture} />
                </div>
            )}
            <div className={style.bubble_container}>
                <div className={classNames}>
                    {props.message.name && (
                        <strong>{props.message.name}</strong>
                    )}
                    {props.children}
                </div>
                <div className={style.time}>
                    {props.message.createdAt.toLocaleTimeString()}
                </div>
            </div>
        </div>
    );
};
