import React, { FunctionComponent } from "react";
import style from "../../style/Message/MessageVideo.scss";
import { MessageProp } from "../MessageFactory";

export const MessageVideo: FunctionComponent<MessageProp> = (
    props: MessageProp
) => {
    return <video className={style.video} src={props.message.video} controls />;
};
