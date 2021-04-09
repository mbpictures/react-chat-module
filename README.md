# react-chat-module

[![NPM](https://img.shields.io/npm/v/react-chat-module.svg)](https://www.npmjs.com/package/react-chat-module)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![ts](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)](http://typescriptlang.org/)

> Embed an easy to use, highly customizable chat in your React app! Optimized for mobile and desktop applications.

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

## Customization
| props                 | type                                  |  default                  | descriptions
| ---------             | ------------------------------------- | -----------               | ------------
| loadingSpinner        | ```JSX.Element```                     | built in Loading spinner  | Override the built in default Loading Spinner which is used while loading the attachment preview
| buttons               | [SendMessageButtons]()                | ```undefined```           | Override the built in buttons
| customFactories       | [CustomFactories](#custom-factories)  | ```undefined```           | Extend or override the built in message type factories
| disableAttachments    | ```boolean```                         | ```false```               | Remove the send attachment button and the functionality to send attachments
| attachmentFileTypes   | ```Array<FileType>```                 | all available file types  | Provide an array with a subset of available file types (e.g. only support uploading of images, videos and audio files)

### Custom factories
To override or extend the functionality of the existing message types, you can provide an object with React components, which will be used instead of the built in ones.
The only thing you have to do is, to provide an object with type names (typing, text, image, video, audio, file) and as value an object with
a ```hasText``` element (renders ```text``` element of ```ChatMessage```) and ```factory``` which is a reference to the component you want to render.
The ```ChatMessage``` is provided as a prop ```message```.

### Custom factories with TypeScript
If you want to use TypeScript and add a new message type, you need to declare it first. You can simply use the following snippet to add
a message type called ```test```:
```tsx
declare module "react-chat-module" {
    export interface MessageTypeMap {
        test: "test";
    }
}
```

## Types
### FileType
The type ```FileType``` is a union type consisting of "audio", "video", "image", "document" and "any". It's used to describe the input file of an attachment.
### MessageType
Specifies the type of message. This union type consists per default of "typing", "text", "photo", "video" and "file" and is extendable ([details](#custom-factories-with-typescript)).
### Message
Interface for a simple message and is provided from the ```OnSend``` callback.
```tsx
export interface Message {
    createdAt: Date;
    type: MessageType;
    text?: string;
    attachment?: File;
}
```
### ChatMessage
Extends the ```Message``` interface:
```tsx
export interface Message {
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
```
Extendable like described earlier, if you need additional information for your custom message component.
### FileMessage
Type for providing messages of type ```file```:
```tsx
export interface FileMessage {
    fileType: string;
    fileName: string;
    file: string;
}
```
### SendMessageButtons
Replace the default send message buttons with custom JSX elements:
```tsx
export interface SendMessageButtons {
    send: JSX.Element;
}
```

## Contribution
Feel free to submit PRs or open issues.

## License

MIT © [Marius Butz](https://github.com/mbpictures)

