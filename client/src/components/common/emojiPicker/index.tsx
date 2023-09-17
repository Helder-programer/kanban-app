import { useEffect, useState } from "react";
import { EmojiClickData, EmojiStyle, SkinTones, Theme } from "emoji-picker-react";

import dynamic from 'next/dynamic';
import { useTheme } from "@/contexts/theme";

interface IProps {
    icon: string;
    onChange(icon: string): void;
}

const Picker = dynamic(
    () => {
        return import('emoji-picker-react');
    },
    { ssr: false }
);


function EmojiPicker({ icon, onChange }: IProps) {
    const [show, setShow] = useState(true);
    const [currentEmoji, setCurrentEmoji] = useState('');
    const { theme } = useTheme();

    const handleEmojiClick = (emoji: EmojiClickData, event: MouseEvent) => {
        setCurrentEmoji(emoji.emoji);
        setShow(false);
        onChange(emoji.emoji);
    }

    const closeWithShortcut = () => {
        document.querySelector('.epr-search')?.addEventListener('keydown', (event: any) => {
            if (event.key === 'Escape') {
                setShow(false);
            }
        });
    }

    useEffect(() => {
        setCurrentEmoji(icon);
        closeWithShortcut();
    }, [icon, show]);


    useEffect(() => {
        setShow(false);
    }, []);


    return (
        <div className="position-relative">
            <h3
                className="m-0"
                onClick={event => setShow(!show)}
                style={{ cursor: "pointer" }}
            >
                {currentEmoji}
            </h3>
            <div className="position-absolute">
                {
                    show &&
                    <Picker
                        theme={theme.name === 'dark-theme' ? Theme.DARK : Theme.LIGHT}
                        onEmojiClick={handleEmojiClick}
                        searchPlaceHolder="Search..."
                        emojiStyle={EmojiStyle.NATIVE}
                        defaultSkinTone={SkinTones.NEUTRAL}
                    />
                }
            </div>
        </div>

    );
}

export default EmojiPicker;