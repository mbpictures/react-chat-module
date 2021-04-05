import style from "../style/Input.scss";
import { IoSend } from "react-icons/io5";
import React, { FunctionComponent } from "react";

export const SendButtonRenderer: FunctionComponent = () => (
    <button className={style.send}>
        <IoSend color="#FFFFFF" size={20} />
    </button>
);
