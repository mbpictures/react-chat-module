import React from "react";
import { ChatMessage } from "./Message";

interface Props {
    message: ChatMessage;
}

export function MessageText(props: Props): JSX.Element {
    return <div>{props.message.text}</div>;
}
