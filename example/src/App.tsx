import React from "react";
import { Chat, Message } from "react-chat-library";
import "react-chat-library/dist/index.css";

const App = () => {
    const messages: Array<Message> = [
        {
            createdAt: new Date(Date.now()),
            messageId: "1",
            senderId: "1",
            profilePicture: "https://via.placeholder.com/150",
            type: "text",
            text: "Hello, how are you?"
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
            senderId: "2",
            profilePicture: "https://via.placeholder.com/150",
            photo: "https://via.placeholder.com/1500",
            type: "photo",
            text: "Look at this funny image!"
        }
    ]
    return (
        <div style={{width: "100%", height: "100%", overflow: "hidden"}}>
            <Chat messages={messages} userId={"1"} />
        </div>
    );
}

export default App
