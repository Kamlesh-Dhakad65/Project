import React, { useEffect, useState } from "react";
import { ChatEngineWrapper, Socket, ChatFeed } from 'react-chat-engine';

interface User {
    email: string;
}

interface Chat {
    id: string;
}

interface ChatEngineProps {
    visible: boolean;
    user: User;
    chat: Chat;
}

const ChatEngine: React.FC<ChatEngineProps> = (props) => {
    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        if (props.visible) {
            setTimeout(() => {
                setShowChat(true);
            }, 500);
        }
    }, [props.visible]);

    return (
        <div
            className='transition-5'
            style={{
                ...styles.chatEngineWindow,
                height: props.visible ? '100%' : '0px',
                zIndex: props.visible ? '100' : '0',
            }}
        >
            {
                showChat &&
                <ChatEngineWrapper>
                    <Socket 
                        projectID="58791e54-afd2-4ebd-9b48-7083cd4555e0"
                        userName={props.user.email}
                        userSecret={props.user.email}
                    />
                    <ChatFeed activeChat={props.chat.id} />
                </ChatEngineWrapper>
            }
        </div>
    );
}

export default ChatEngine;

const styles = {
    chatEngineWindow: {
        width: '100%',  
        backgroundColor: '#fff',
    }
};
