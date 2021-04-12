import React from "react";
import style from "../style/Util/ElementLoad.scss";

interface Props {
    children?: JSX.Element;
    loaded: boolean;
    loadingSpinner: JSX.Element | null;
}

export const ElementLoad = (props: Props) => {
    return (
        <div className={style.container}>
            <div
                className={style.loader}
                style={{ display: props.loaded ? "none" : "block" }}
            >
                {props.loadingSpinner}
            </div>
            <div style={{ display: props.loaded ? "block" : "none" }}>
                {props.children}
            </div>
        </div>
    );
};
