export type MessageType = "typing" | "text" | "photo" | "video" | "file";

export interface Message {
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
}

export interface File {
    fileType: string;
    file: string;
}
