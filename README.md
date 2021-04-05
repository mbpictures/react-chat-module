# react-chat-module

> Embed an easy to use, highly customizable chat in your React app!

[![NPM](https://img.shields.io/npm/v/react-chat-module.svg)](https://www.npmjs.com/package/react-chat-module) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-chat-module
```

## Usage

```tsx
import React, { useState } from 'react'

import { Chat, Message } from 'react-chat-module'
import 'react-chat-module/dist/index.css'

function Example() {

    const [messages, setMessages] = useState([
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
    ]);

    // append user typed message to messages array
    const handleSend = (message: Message) => {
        setMessages([
            ...messages,
            {
                messageId: `${messageId}`,
                senderId: "1",
                profilePicture: "https://via.placeholder.com/150",
                type: message.type,
                text: message.text,
                createdAt: message.createdAt,
                read: false
            }
        ]);
    }

    return <Chat userId={"1"} messages={exampleMessages} handleSend={handleSend} />
}
```

A full example can be found [here](example/src/App.tsx).

## License

MIT © [Marius Butz](https://github.com/mbpictures)
