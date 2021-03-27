import { OnMessageSend } from "./index";
import React, { createRef } from "react";
import style from "./style/SendMessage.scss";
import { IoSend } from "react-icons/io5";

interface Props {
    onSend?: OnMessageSend;
}

export function SendMessage(props: Props) {
    const inputField = createRef<HTMLTextAreaElement>();

    const handleSend = () => {
        if (inputField.current === null) return;
        if (inputField.current.value.length <= 0) return;
        if (!props.onSend) return;

        props.onSend(inputField.current.value);
        inputField.current.value = "";
    };

    return (
        <div className={style.message_container}>
            <textarea ref={inputField} />
            <button onClick={handleSend}>
                <IoSend color="#FFFFFF" size={20} />
            </button>
        </div>
    );
}
