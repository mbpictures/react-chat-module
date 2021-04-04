import React from "react";
import { ChatMessage } from "../Message";
import { AudioPlayer } from "../../Util/AudioPlayer";

interface Props {
    message: ChatMessage;
}

export function MessageAudio(props: Props): JSX.Element | null {
    if (!props.message.audio) return null;
    return <AudioPlayer file={props.message.audio} />;
}
