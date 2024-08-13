import {
    IoAttachOutline,
    IoDocumentTextOutline,
    IoFileTrayFullOutline,
    IoFilmOutline,
    IoImageOutline,
    IoMusicalNotesOutline,
    IoCloudUpload,
} from "react-icons/io5";
import React, { FunctionComponent, useRef, useState } from "react";
import style from "../style/FileAttachment.scss";
import { FileButton } from "./FileButton";
import { Message } from "../Message/Message";

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

interface Props {
    onSelectFile: (file: Message) => any;
    attachmentFileTypes?: Array<FileType>;
    isUploading?: boolean;
    loadingSpinner?: JSX.Element;
}

export const FileAttachment: FunctionComponent<Props> = (props: Props) => {
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleOpenAttachment = () => {
        setPopupOpen(true);
    };

    const handleCloseAttachment = () => {
        setPopupOpen(false);
    };

    const handleSelectFile = (file: Message) => {
        handleCloseAttachment();
        props.onSelectFile(file);
    };

    const classNamesPopup = `${style.popup} ${popupOpen ? style.open : ""}`;
    const attachmentFileTypes =
        props.attachmentFileTypes ??
        FileTypes.map((value) => value as FileType);

    const fileButtons = attachmentFileTypes.map((type) => {
        return (
            <FileButton
                fileType={type}
                key={type}
                color={FileTypeColor[type]}
                onSelect={handleSelectFile}
            >
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
                <div
                    className={`${style.uploadingOverlay} ${
                        props.isUploading ? style.open : ""
                    }`}
                >
                    {props.loadingSpinner}
                    <IoCloudUpload size={20} className={style.icon} />
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
};
