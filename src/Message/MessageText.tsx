import React from "react";
import { Message } from "./Message";

interface Props {
    message: Message;
}

export function MessageText(props: Props): JSX.Element {
    return <div>{props.message.text}</div>;
}
