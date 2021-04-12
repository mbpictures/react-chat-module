import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import style from "../../style/Message/MessagePhoto.scss";
import { MessageProp } from "../MessageFactory";
import { ElementLoad } from "../../Util/ElementLoad";

const MessageImageInternal: FunctionComponent<MessageProp> = (props) => {
    const [loaded, setLoaded] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!imageRef.current) return;
        if (imageRef.current.complete) {
            setLoaded(true);
            return;
        }
        imageRef.current.onload = (): void => {
            setLoaded(true);
        };
    }, [props.message, imageRef]);

    return (
        <ElementLoad loaded={loaded} loadingSpinner={props.loadingSpinner}>
            <img
                className={style.photo}
                src={props.message.photo}
                ref={imageRef}
            />
        </ElementLoad>
    );
};

export const MessageImage = React.memo(MessageImageInternal);
