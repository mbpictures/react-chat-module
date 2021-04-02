import React from "react";
import style from "./style/LoadingIndicator.scss";

export function LoadingIndicator() {
    return (
        <div className={style.holder}>
            <div className={style.sk_chase}>
                <div className="sk-chase-dot" />
                <div className="sk-chase-dot" />
                <div className="sk-chase-dot" />
                <div className="sk-chase-dot" />
                <div className="sk-chase-dot" />
                <div className="sk-chase-dot" />
            </div>
        </div>
    );
}
