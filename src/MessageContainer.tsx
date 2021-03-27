import { Message } from "./Message/Message";
import React from "react";
import { MessageFactory } from "./Message/MessageFactory";
import style from "./style/MessageContainer.scss";

interface Props {
    messages: Array<Message>;
    userId: string;
}

interface State {
    messages: Array<JSX.Element>;
}

export class MessageContainer extends React.Component<Props, State> {
    messagesEqual(
        messages1: Array<Message>,
        messages2: Array<Message>
    ): boolean {
        if (messages1.length === messages2.length) return true;

        // check whether ids are different
        const uniqueIds2 = Array.from(
            new Set(messages2.map((message) => message.messageId))
        );
        const uniqueIds1 = Array.from(
            new Set(messages1.map((message) => message.messageId))
        );
        const uniqueIdsCombined = Array.from(
            new Set(uniqueIds1.concat(uniqueIds2))
        );
        return uniqueIdsCombined.length === uniqueIds2.length;
    }

    shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
        return !this.messagesEqual(this.props.messages, nextProps.messages);
    }

    render() {
        const messages = this.props.messages.map((message) =>
            MessageFactory.makeMessage(message, this.props.userId)
        );
        return <div className={style.message_container}>{messages}</div>;
    }
}
