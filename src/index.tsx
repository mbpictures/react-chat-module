import * as React from "react";
import { ChatMessage, Message } from "./Message/Message";
import { MessageContainer } from "./Message/MessageContainer";
import { SendMessage, SendMessageButtons } from "./SendMessage";
import style from "./style/Main.scss";
import { LoadingIndicator } from "./LoadingIndicator";
import { CustomFactories } from "./Message/MessageFactory";
import { FileType } from "./Attachment/FileAttachment";
import { useDropzone } from "./Util/Dropzone";
export * from "./Message/Message";
export { MessageContainer };

export type OnMessageSend = (message: Message) => unknown;

interface Props {
    messages: Array<ChatMessage>;
    userId: string;
    onSend?: OnMessageSend;
    loadingSpinner?: JSX.Element;
    buttons?: Partial<SendMessageButtons>;
    customFactories?: CustomFactories;
    disableAttachments?: boolean;
    attachmentFileTypes?: Array<FileType>;
    isUploading?: boolean;
}

export const Chat: React.FunctionComponent<Props> = (props: Props) => {
    const { dropzoneContainerProps, feedbackContainer } = useDropzone();

    const loadingSpinner = props.loadingSpinner ?? <LoadingIndicator />;

    return (
        <div className={style.main} {...dropzoneContainerProps}>
            <div className={style.container}>
                <MessageContainer
                    userId={props.userId}
                    messages={props.messages}
                    factoryOverride={props.customFactories}
                    loadingSpinner={loadingSpinner}
                />
                <SendMessage
                    onSend={props.onSend}
                    loadingSpinner={loadingSpinner}
                    buttons={props.buttons}
                    customFactories={props.customFactories}
                    disableAttachments={props.disableAttachments}
                    attachmentFileTypes={props.attachmentFileTypes}
                    isUploading={props.isUploading}
                />
            </div>
            {feedbackContainer}
        </div>
    );
};
