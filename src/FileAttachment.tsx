import {
    IoAttachOutline,
    IoDocumentTextOutline,
    IoFileTrayFullOutline,
    IoFilmOutline,
    IoImageOutline,
    IoMusicalNotesOutline,
} from "react-icons/io5";
import React, { useRef, useState } from "react";
import style from "./style/FileAttachment.scss";
import { FileButton } from "./FileButton";

export const FileTypes = [
    "audio",
    "video",
    "image",
    "document",
    "any",
] as const;
export type FileType = typeof FileTypes[number];
export const FileTypeColor: Record<FileType, string> = {
    audio: "#5858ff",
    video: "#63c1ff",
    image: "#50d776",
    document: "#de6f6f",
    any: "#de8282",
};
export const FileTypeIcons: Record<FileType, JSX.Element> = {
    audio: <IoMusicalNotesOutline size={20} color="#FFFFFF" />,
    video: <IoFilmOutline size={20} color="#FFFFFF" />,
    image: <IoImageOutline size={20} color="#FFFFFF" />,
    document: <IoDocumentTextOutline size={20} color="#FFFFFF" />,
    any: <IoFileTrayFullOutline size={20} color="#FFFFFF" />,
};

export function FileAttachment() {
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleOpenAttachment = () => {
        setPopupOpen(true);
    };

    const handleCloseAttachment = () => {
        setPopupOpen(false);
    };

    const classNamesPopup = `${style.popup} ${popupOpen ? style.open : ""}`;

    const fileButtons = FileTypes.map((type) => {
        return (
            <FileButton fileType={type} key={type} color={FileTypeColor[type]}>
                {FileTypeIcons[type]}
            </FileButton>
        );
    });

    return (
        <div>
            <div className={style.overlay}>
                <button
                    onClick={handleOpenAttachment}
                    className={style.attachment}
                >
                    <IoAttachOutline color="#FFFFFF" size={20} />
                </button>
                <div className={classNamesPopup} ref={wrapperRef}>
                    {fileButtons}
                </div>
            </div>
            {popupOpen && (
                <div
                    className={style.blocker}
                    onClick={handleCloseAttachment}
                />
            )}
        </div>
    );
}
