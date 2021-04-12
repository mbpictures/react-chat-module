import React, { FunctionComponent } from "react";
import { AudioPlayer } from "../../Util/AudioPlayer";
import { MessageProp } from "../MessageFactory";

const MessageAudioInternal: FunctionComponent<MessageProp> = (
    props: MessageProp
) => {
    if (!props.message.audio) return null;
    return <AudioPlayer file={props.message.audio} />;
};

export const MessageAudio = React.memo(MessageAudioInternal);
