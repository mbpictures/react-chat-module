import * as React from "react";
import { Message } from "./Message/Message";
import { MessageContainer } from "./MessageContainer";
export * from "./Message/Message";

export type OnMessageSend = (message: string) => unknown;

interface Props {
    messages: Array<Message>;
    userId: string;
    onSend?: OnMessageSend;
}

export class Chat extends React.Component<Props, any> {
    render() {
        return (
            <MessageContainer
                userId={this.props.userId}
                messages={this.props.messages}
            />
        );
    }
}
