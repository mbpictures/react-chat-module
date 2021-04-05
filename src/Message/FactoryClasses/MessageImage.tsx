import React from "react";
import style from "../../style/Message/MessagePhoto.scss";
import { MessageProp } from "../MessageFactory";

export const MessageImage = (props: MessageProp) => {
    return <img className={style.photo} src={props.message.photo} />;
};
