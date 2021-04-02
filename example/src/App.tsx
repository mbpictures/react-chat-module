import React from "react";
import { Chat, ChatMessage, Message } from "react-chat-library";
import "react-chat-library/dist/index.css";

const App = () => {
    // add initial set of example messages
    const [messages, setMessages] = React.useState<Array<ChatMessage>>([
        {
            createdAt: new Date(Date.now()),
            messageId: "1",
            senderId: "1",
            profilePicture: "https://via.placeholder.com/150",
            type: "text",
            text: "Hello, how are you?",
            name: "John Doe"
        },
        {
            createdAt: new Date(Date.now() + 2000),
            messageId: "2",
            senderId: "2",
            profilePicture: "https://via.placeholder.com/150",
            type: "text",
            text: "I'm fine, and you?"
        },
        {
            createdAt: new Date(Date.now() + 4000),
            messageId: "3",
            senderId: "1",
            profilePicture: "https://via.placeholder.com/150",
            type: "text",
            text: "Me too, thanks!"
        },
        {
            createdAt: new Date(Date.now() + 6000),
            messageId: "4",
            senderId: "1",
            profilePicture: "https://via.placeholder.com/150",
            photo: "https://via.placeholder.com/1500",
            type: "image",
            text: "Look at this funny image!"
        },
        {
            createdAt: new Date(Date.now() + 6000),
            messageId: "5",
            senderId: "2",
            profilePicture: "https://via.placeholder.com/150",
            video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            type: "video",
            text: "Look at this funny video!"
        },
        {
            createdAt: new Date(Date.now() + 6000),
            messageId: "6",
            senderId: "1",
            profilePicture: "https://via.placeholder.com/150",
            file: {
                fileType: "mp4",
                file: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
                fileName: "Sample Video"
            },
            type: "file"
        },
        {
            createdAt: new Date(Date.now() + 6000),
            messageId: "7",
            senderId: "2",
            profilePicture: "https://via.placeholder.com/150",
            audio: "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_1MG.mp3",
            type: "audio"
        }
    ]);

    const onSend = (message: Message) => {
        // build new message received from chat component
        const messageId = parseInt(messages[messages.length - 1].messageId) + 1;
        const newMessage: ChatMessage = {
            messageId: `${messageId}`,
            senderId: "1",
            profilePicture: "https://via.placeholder.com/150",
            type: message.type,
            text: message.text,
            createdAt: message.createdAt,
            read: false
        };

        // store user message in messages state and add "server" message
        // to simulate typing
        setMessages([
            ...(messages.filter((message) => message.type !== "typing")),
            newMessage, {
                messageId: `${messageId + 1}`,
                senderId: "2",
                profilePicture: "https://via.placeholder.com/150",
                type: "typing",
                createdAt: new Date(Date.now()),
                read: false
            }
        ]);

        setTimeout(() => {
            // send generated answer after 2secs of "typing"
            setMessages((messages) => [
                ...(messages.filter((message) => message.type !== "typing")),
                {
                    messageId: `${messageId + 1}`,
                    senderId: "2",
                    profilePicture: "https://via.placeholder.com/150",
                    type: "text",
                    text: message.text,
                    createdAt: new Date(Date.now()),
                    read: false
                }
            ]);
        }, 2000);
    };

    // adding chat component in full screen container
    return (
        <div style={{width: "100%", height: "100%", overflow: "hidden"}}>
            <Chat messages={messages} userId={"1"} onSend={onSend} />
        </div>
    );
}

export default App
