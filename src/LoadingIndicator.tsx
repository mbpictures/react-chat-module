import React, { FunctionComponent } from "react";
import style from "./style/LoadingIndicator.scss";

export const LoadingIndicator: FunctionComponent = () => {
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
};
