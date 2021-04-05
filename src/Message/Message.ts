export interface MessageTypeMap {
    typing: "typing";
    text: "text";
    image: "image";
    video: "video";
    file: "file";
    audio: "audio";
};

export type MessageType = MessageTypeMap[keyof MessageTypeMap];

export interface Message {
    createdAt: Date;
    type: MessageType;
    text?: string;
    attachment?: File;
}

export interface ChatMessage extends Message {
    messageId: string;
    senderId: string | number;
    profilePicture?: string;
    name?: string;
    photo?: string;
    video?: string;
    file?: FileMessage;
    read?: boolean;
    audio?: string;
}

export interface FileMessage {
    fileType: string;
    fileName: string;
    file: string;
}
