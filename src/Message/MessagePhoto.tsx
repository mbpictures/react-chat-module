import React from "react";
import { Message } from "./Message";

interface Props {
    message: Message;
}

export function MessagePhoto(props: Props): JSX.Element {
    return (
        <div>
            <img src={props.message.photo} />
        </div>
    );
}
