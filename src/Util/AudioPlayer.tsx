import React, { useEffect, useState } from "react";
import style from "../style/Util/AudioPlayer.scss";
import { IoPause, IoPlaySharp } from "react-icons/io5";

interface Props {
    file: string;
}

const zeroPad = (num: number, places: number): string =>
    String(num).padStart(places, "0");

const formatTime = (time: number): string => {
    return `${zeroPad(Math.floor(time / 60), 2)}:${zeroPad(
        Math.floor(time % 60),
        2
    )}`;
};

export function AudioPlayer(props: Props) {
    const [playing, setPlaying] = useState<boolean>(false);
    const [audioEl, setAudioEl] = useState<HTMLAudioElement | undefined>(
        undefined
    );
    const [duration, setDuration] = useState<string>(formatTime(0));
    const [progress, setProgress] = useState<string>(formatTime(0));
    const [progressPercent, setProgressPercent] = useState<number>(0);

    useEffect(() => {
        if (audioEl && !audioEl.ended) {
            audioEl.pause();
        }
        setAudioEl(new Audio(props.file));

        return () => {
            if (!audioEl) return;
            audioEl.pause();
        };
    }, []);

    useEffect(() => {
        if (!audioEl) return;
        audioEl.oncanplay = () => {
            setDuration(formatTime(audioEl.duration));
        };
        audioEl.ontimeupdate = () => {
            setProgress(formatTime(audioEl.currentTime));
            setProgressPercent(audioEl.currentTime / audioEl.duration);
        };
    }, [audioEl]);

    const handlePlay = async (): Promise<void> => {
        if (!audioEl) return;
        if (playing) return;
        await audioEl.play();
        setPlaying(true);
    };

    const handlePause = () => {
        if (!audioEl) return;
        if (!playing) return;
        audioEl.pause();
        setPlaying(false);
    };

    const handleScrub = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioEl) return;
        audioEl.currentTime =
            parseFloat(event.currentTarget.value) * audioEl.duration;
    };

    return (
        <div className={style.audio_player}>
            <div className={style.button}>
                {!playing && (
                    <button onClick={handlePlay}>
                        <IoPlaySharp />
                    </button>
                )}
                {playing && (
                    <button onClick={handlePause}>
                        <IoPause />
                    </button>
                )}
            </div>
            <div className={style.player}>
                <span>{progress}</span>
                <input
                    value={progressPercent}
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    onChange={handleScrub}
                />
                <span>{duration}</span>
            </div>
        </div>
    );
}
