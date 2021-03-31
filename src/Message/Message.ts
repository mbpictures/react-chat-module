export type MessageType =
    | "typing"
    | "text"
    | "photo"
    | "video"
    | "file"
    | "audio";

export interface ChatMessage {
    createdAt: Date;
    messageId: string;
    type: MessageType;
    senderId: string | number;
    profilePicture: string;
    text?: string;
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
