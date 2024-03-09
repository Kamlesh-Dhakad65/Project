import React, { useState } from "react";
import EmailForm from "./EmailForm";
import ChatEngine from "../ChatEngine";
import { styles } from "../style"; 

interface Chat {
    id: string; 
}

interface User {
    email: string;
}

interface SupportWindowProps {
    visible: any;
}

const SupportWindow: React.FC<SupportWindowProps> = (props) => {
    const [user, setUser] = useState<User | null>(null);
    const [chat, setChat] = useState<Chat | null>(null);
    const [emailSent, setEmailSent] = useState(false); // State variable to track email sent status

    const handleEmailSent = () => {
        setEmailSent(true);
    }

    return (
        <div 
            className='transition-5'
            style={{
                ...styles.supportWindow, 
                opacity: props.visible ? '1' : '0',
            }}
        >
            {/* Conditionally render EmailForm or ChatEngine based on emailSent state */}
            {!emailSent ? (
                <EmailForm 
                    visible={user === null || chat === null}
                    setUser={setUser} 
                    setChat={setChat} 
                    onEmailSent={handleEmailSent} // Pass a callback to handle email sent event
                />
            ) : (
                <div style={{ backgroundColor: 'white', height: '100%', width: '100%' }} />
            )}
            
            {/* Render ChatEngine only when email is sent */}
            {emailSent && user && chat && (
                <ChatEngine 
                    visible={true}
                    user={user} 
                    chat={chat} 
                />
            )}
        </div>
    );
}

export default SupportWindow;
