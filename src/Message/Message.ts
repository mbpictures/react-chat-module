export type MessageType =
    | "typing"
    | "text"
    | "image"
    | "video"
    | "file"
    | "audio";

export interface Message {
    createdAt: Date;
    type: MessageType;
    text?: string;
}

export interface ChatMessage extends Message {
    messageId: string;
    senderId: string | number;
    profilePicture: string;
    photo?: string;
    video?: string;
    file?: File;
    read?: boolean;
    audio?: string;
}

export interface File {
    fileType: string;
    fileName: string;
    file: string;
}
