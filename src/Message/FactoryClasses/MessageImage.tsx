import React from "react";
import { ChatMessage } from "../Message";
import style from "../../style/Message/MessagePhoto.scss";

interface Props {
    message: ChatMessage;
}

export function MessageImage(props: Props): JSX.Element {
    return <img className={style.photo} src={props.message.photo} />;
}
