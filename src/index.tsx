import * as React from "react";
import { Message } from "./Message/Message";
import { MessageContainer } from "./MessageContainer";
import { SendMessage } from "./SendMessage";
export * from "./Message/Message";
import style from "./style/Main.scss";

export type OnMessageSend = (message: string) => unknown;

interface Props {
    messages: Array<Message>;
    userId: string;
    onSend?: OnMessageSend;
}

export class Chat extends React.Component<Props, any> {
    render() {
        return (
            <div className={style.main}>
                <div className={style.container}>
                    <MessageContainer
                        userId={this.props.userId}
                        messages={this.props.messages}
                    />
                    <SendMessage onSend={this.props.onSend} />
                </div>
            </div>
        );
    }
}
