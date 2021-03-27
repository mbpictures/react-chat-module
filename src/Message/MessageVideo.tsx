import React from "react";
import { Message } from "./Message";

interface Props {
    message: Message;
}

export function MessageVideo(props: Props): JSX.Element {
    return (
        <div>
            <video src={props.message.photo} />
        </div>
    );
}
