import React from "react";
import { ChatMessage } from "../Message";
import style from "../../style/Message/MessageVideo.scss";

interface Props {
    message: ChatMessage;
}

export function MessageVideo(props: Props): JSX.Element {
    return <video className={style.video} src={props.message.video} controls />;
}
