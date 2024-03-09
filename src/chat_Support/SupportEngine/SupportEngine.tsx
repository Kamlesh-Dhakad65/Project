import React, { useState } from "react";
import { styles } from './style';

interface AvatarProps {
    style?: React.CSSProperties;
    onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = (props) => {
    const [hovered, setHovered] = useState<boolean>(false);

    return (
        <div style={props.style}>
            <div
                className='transition-3'
                style={{
                    ...styles.avatarHello,
                    opacity: hovered ? 1 : 0
                }}
            >
                Hey Its Admin 🤙
            </div>

            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => props.onClick && props.onClick()}
                className='transition-3'
                style={{
                    ...styles.chatWithMeButton,
                    border: hovered ? '1px solid #f9f0ff' : '4px solid #7a39e0'
                }}
            />
        </div>
    );
};

export default Avatar;
