import { useEffect, useState } from "react";
import { EmojiClickData, EmojiStyle, Theme } from "emoji-picker-react";
import styled from 'styled-components';

interface IProps {
    icon: string;
    className?: string;
    onChange(icon: string): void;

}

import dynamic from 'next/dynamic';

const Picker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);


function EmojiPicker({ icon, className, onChange }: IProps) {
    const [show, setShow] = useState(false);
    const [currentEmoji, setCurrentEmoji] = useState('');

    useEffect(() => {
        setCurrentEmoji(icon);  
    }, [icon]);
    

    const handleEmojiClick = (emoji: EmojiClickData, event: MouseEvent) => {
        setCurrentEmoji(emoji.emoji);
        setShow(false);
        onChange(emoji.emoji);
    }


    return (
        <div className={className}>
            <h3
                className="m-0"
                onClick={event => setShow(!show)}
            >
                {currentEmoji}
            </h3>
            <div id="emoji-picker">
                {
                    show &&
                    <Picker theme={Theme.DARK} onEmojiClick={handleEmojiClick} searchPlaceHolder="Search..." emojiStyle={EmojiStyle.NATIVE} />
                }
            </div>
        </div>

    );
}

const StyledEmojiPicker = styled(EmojiPicker)`
    position: relative;

    h3 {
        cursor: pointer;
    }

    #emoji-picker {
        position: absolute;
    }
    

`;

export default StyledEmojiPicker;