import { ChatMessage } from "./Message";
import React from "react";
import { CustomFactories, MessageFactoryBubble } from "./MessageFactory";
import style from "../style/Message/MessageContainer.scss";

interface Props {
    messages: Array<ChatMessage>;
    userId: string;
    factoryOverride?: CustomFactories;
    loadingSpinner?: JSX.Element;
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
        messages1: Array<ChatMessage>,
        messages2: Array<ChatMessage>
    ): boolean {
        if (messages1.length !== messages2.length) return false;

        // check whether ids are different
        const uniqueIds2 = Array.from(
            new Set(
                messages2.map((message) => {
                    return {
                        id: message.messageId,
                        type: message.type,
                    };
                })
            )
        );
        const uniqueIds1 = Array.from(
            new Set(
                messages1.map((message) => {
                    return {
                        id: message.messageId,
                        type: message.type,
                    };
                })
            )
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
        const messages = this.props.messages.map((message) => (
            <MessageFactoryBubble
                key={message.messageId}
                message={message}
                userId={this.props.userId}
                customFactories={this.props.factoryOverride}
                additionalProps={{ loadingSpinner: this.props.loadingSpinner }}
            />
        ));
        return (
            <div className={style.message_container}>
                {messages}
                <div ref={this.bottomRef} />
            </div>
        );
    }
}
