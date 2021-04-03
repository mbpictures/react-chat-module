import React, { createRef } from "react";
import { OnMessageSend } from "./index";
import style from "./style/Input.scss";
import { SendButtonRenderer } from "./Renderer/SendButtonRenderer";

interface Props {
    onSend?: OnMessageSend;
    allowEmptyMessages?: boolean;
    sendButton?: JSX.Element;
}

export const Input: React.FunctionComponent<Props> = (props: Props) => {
    const inputField = createRef<HTMLTextAreaElement>();

    const handleSend = () => {
        if (inputField.current === null) return;
        if (
            !props.allowEmptyMessages &&
            inputField.current.value.trim().length <= 0
        )
            return;
        if (!props.onSend) return;

        props.onSend({
            text: inputField.current.value,
            createdAt: new Date(Date.now()),
            type: "text",
        });
        inputField.current.value = "";
    };

    const handleInputKey = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        handleSend();
    };

    return (
        <div className={style.input}>
            <textarea ref={inputField} onKeyPress={handleInputKey} />
            <div onClick={handleSend}>{props.sendButton}</div>
        </div>
    );
};

Input.defaultProps = {
    sendButton: <SendButtonRenderer />,
};
