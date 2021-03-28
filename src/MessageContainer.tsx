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
    private readonly bottomRef: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {
        super(props);

        this.bottomRef = React.createRef<HTMLDivElement>();
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    messagesEqual(
        messages1: Array<Message>,
        messages2: Array<Message>
    ): boolean {
        if (messages1.length !== messages2.length) return false;

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

    componentDidMount() {
        this.scrollToBottom();
    }

    scrollToBottom(behaviour?: ScrollIntoViewOptions) {
        if (this.bottomRef.current === null) return;
        this.bottomRef.current.scrollIntoView(behaviour);
    }

    componentDidUpdate() {
        this.scrollToBottom({ behavior: "smooth" });
    }

    shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
        return !this.messagesEqual(this.props.messages, nextProps.messages);
    }

    render() {
        const messages = this.props.messages.map((message) =>
            MessageFactory.makeMessage(message, this.props.userId)
        );
        return (
            <div className={style.message_container}>
                {messages}
                <div ref={this.bottomRef} />
            </div>
        );
    }
}
