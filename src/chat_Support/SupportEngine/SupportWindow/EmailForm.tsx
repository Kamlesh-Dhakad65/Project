import React, { useState } from "react";
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
import { styles } from "../style"; // Correct import path to styles


interface Chat {
    id: string; 
}
interface User {
    email: string;
}

interface EmailFormProps {
    visible: boolean;
    setUser: any;
    setChat: any;
    onEmailSent: () => void; // Callback function to be called when email is sent
}

const projectID = "58791e54-afd2-4ebd-9b48-7083cd4555e0";
const privateKey = "af0fb556-c185-401f-9e7b-024b6f5ad0bd";

const getOrCreateUser = (email: string, callback: (user: User) => void) => {
    axios.put(
        'https://api.chatengine.io/users/',
        { username: email, email: email, secret: email },
        { headers: { "Private-Key": privateKey } }
    )
    .then(response => callback(response.data))
    .catch(error => console.log('Get or create user error:', error));
}

const getOrCreateChat = (email: string, callback: (chat: Chat) => void) => {
    axios.put(
        'https://api.chatengine.io/chats/',
        { usernames: [email, "kalyani@gmail.com"], is_direct_chat: true },
        { headers: { 
            "Project-ID": projectID,
            "User-Name": email,
            "User-Secret": email,
        }}
    )
    .then(response => callback(response.data))
    .catch(error => console.log('Get or create chat error:', error));
}

const EmailForm: React.FC<EmailFormProps> = (props) => {    
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false); // State variable to track email sent status

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        console.log('Sending Email:', email);

        getOrCreateUser(email, (user: User) => {
            props.setUser(user);
            getOrCreateChat(email, (chat: Chat) => {
                setLoading(false);
                props.setChat(chat);
                setEmailSent(true); // Update state when email is sent
                props.onEmailSent(); // Call the onEmailSent callback
            });
        });
    }

    return (
        <div 
            style={{
                ...styles.emailFormWindow,
                height: '100%',
                opacity: '1',
                backgroundColor: emailSent ? '#ffffff' : '' // Change background color to white if email is sent
            }}
        >
            <div style={{ height: '0px' }}>
                <div style={styles.stripe} />
            </div>

            <div 
                className='transition-5'
                style={{
                    ...styles.loadingDiv,
                    zIndex: loading ? '10' : '-1',
                    opacity: loading ? '0.33' : '0',
                }}
            />
            <LoadingOutlined
                className='transition-5'
                style={{
                    ...styles.loadingIcon,
                    zIndex: loading ? '10' : '-1',
                    opacity: loading ? '1' : '0',
                    fontSize: '82px',
                    top: 'calc(50% - 41px)', 
                    left: 'calc(50% - 41px)',  
                }}
                rev=""
            />

            <div style={{ position: 'absolute', height: '100%', width: '100%', textAlign: 'center' }}>
                <div style={styles.topText}>
                    Welcome to my <br /> support 👋
                </div>

                <form 
                    onSubmit={handleSubmit}
                    style={{ position: 'relative', width: '100%', top: '19.75%' }}
                >
                    <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.emailInput}
                    />
                    <button type="submit">Submit</button>
                </form>

                <div style={styles.bottomText}>
                    Enter your email <br /> to get started.
                </div>
            </div>
        </div>
    );
}

export default EmailForm;
