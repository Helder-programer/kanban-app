import { useEffect, useState } from "react";
import { EmojiClickData, EmojiStyle, Theme } from "emoji-picker-react";

import dynamic from 'next/dynamic';
import { useTheme } from "@/contexts/theme";

interface IProps {
    icon: string;
    className?: string;
    onChange(icon: string): void;

}

const Picker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);


function EmojiPicker({ icon, className, onChange }: IProps) {
    const [show, setShow] = useState(false);
    const [currentEmoji, setCurrentEmoji] = useState('');
    const {theme} = useTheme();

    useEffect(() => {
        setCurrentEmoji(icon);  
    }, [icon]);
    

    const handleEmojiClick = (emoji: EmojiClickData, event: MouseEvent) => {
        setCurrentEmoji(emoji.emoji);
        setShow(false);
        onChange(emoji.emoji);
    }


    return (
        <div className="position-relative">
            <h3
                className="m-0"
                onClick={event => setShow(!show)}
                style={{cursor: "pointer"}}
            >
                {currentEmoji}
            </h3>
            <div className="position-absolute">
                {
                    show &&
                    <Picker 
                    theme={theme.name === 'dark-theme' ? Theme.DARK: Theme.LIGHT} 
                    onEmojiClick={handleEmojiClick} 
                    searchPlaceHolder="Search..." 
                    emojiStyle={EmojiStyle.NATIVE} />
                }
            </div>
        </div>

    );
}

export default EmojiPicker;