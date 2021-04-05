import React, { FunctionComponent } from "react";
import { MessageProp } from "../MessageFactory";

export const MessageText: FunctionComponent<MessageProp> = (
    props: MessageProp
) => {
    return <div>{props.message.text}</div>;
};
