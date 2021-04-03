import * as React from "react";
import { ChatMessage, Message } from "./Message/Message";
import { MessageContainer } from "./Message/MessageContainer";
import { SendMessage } from "./SendMessage";
import style from "./style/Main.scss";
export * from "./Message/Message";
export { MessageContainer };

export type OnMessageSend = (message: Message) => unknown;

interface Props {
    messages: Array<ChatMessage>;
    userId: string;
    onSend?: OnMessageSend;
}

}
export const Chat: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <div className={style.main}>
            <div className={style.container}>
                <MessageContainer
                    userId={props.userId}
                    messages={props.messages}
                />
                <SendMessage onSend={props.onSend} />
            </div>
        </div>
    );
};
