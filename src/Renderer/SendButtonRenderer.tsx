import style from "../style/Input.scss";
import { IoSend } from "react-icons/io5";
import React from "react";

export const SendButtonRenderer = () => (
    <button className={style.send}>
        <IoSend color="#FFFFFF" size={20} />
    </button>
);
