import React from "react";
import { ChatMessage } from "../Message";
import style from "../../style/Message/MessageAudio.scss";

interface Props {
    message: ChatMessage;
}

export function MessageAudio(props: Props): JSX.Element {
    return <audio className={style.audio} src={props.message.audio} controls />;
}
