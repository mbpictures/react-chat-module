import React from "react";
import { ChatMessage } from "./Message";
import { IoDownloadOutline, IoDocument } from "react-icons/io5";
import style from "../style/Message/MessageFile.scss";

interface Props {
    message: ChatMessage;
}

export function MessageFile(props: Props): JSX.Element {
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
                <a href={props.message.file?.file}>
                    <IoDownloadOutline />
                </a>
            </div>
        </div>
    );
}
