import React, { FunctionComponent, useEffect, useState } from "react";
import style from "../../style/Message/MessagePhoto.scss";
import { MessageProp } from "../MessageFactory";
import { ElementLoad } from "../../Util/ElementLoad";

export const MessageImage: FunctionComponent<MessageProp> = (props) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(false);
    }, [props.message]);

    const onLoad = () => {
        setLoaded(true);
    };

    return (
        <ElementLoad loaded={loaded} loadingSpinner={props.loadingSpinner}>
            <img
                className={style.photo}
                src={props.message.photo}
                onLoad={onLoad}
            />
        </ElementLoad>
    );
};
