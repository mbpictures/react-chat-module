import React, { FunctionComponent } from "react";
import style from "../../style/Message/MessageTyping.scss";

export const MessageTyping: FunctionComponent = () => {
    return (
        <div className={style.typing}>
            <span />
            <span />
            <span />
        </div>
    );
};
