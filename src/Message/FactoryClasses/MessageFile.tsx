import React, { FunctionComponent } from "react";
import { IoDownloadOutline, IoDocument } from "react-icons/io5";
import style from "../../style/Message/MessageFile.scss";
import { MessageProp } from "../MessageFactory";

interface Props extends MessageProp {
    hideDownload?: boolean;
}

export const MessageFile: FunctionComponent<Props> = (props: Props) => {
    return (
        <div className={style.message_file_container}>
            <div className={style.message_file}>
                <div className={style.file}>
                    <div className={style.file_icon}>
                        <IoDocument />
                    </div>
                    <p>{props.message.file?.fileType}</p>
                </div>
                <p>{props.message.file?.fileName}</p>
                {!props.hideDownload && (
                    <a href={props.message.file?.file}>
                        <IoDownloadOutline />
                    </a>
                )}
            </div>
        </div>
    );
};
