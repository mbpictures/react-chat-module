import React from "react";
import style from "../../style/Message/MessageTyping.scss";

export function MessageTyping(): JSX.Element {
    return (
        <div className={style.typing}>
            <span />
            <span />
            <span />
        </div>
    );
}
