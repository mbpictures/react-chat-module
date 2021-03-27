import React from "react";
import { Message } from "./Message";

interface Props {
    message: Message;
}

export function MessageFile(props: Props): JSX.Element {
    return (
        <div>
            <a href={props.message.file?.file}>Download File</a>
        </div>
    );
}
