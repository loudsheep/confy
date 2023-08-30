import React, { useRef, useState } from 'react';

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import Icon from './Icon';

const EmojiPicker = ({ onEmojiSelect }) => {

    const theme = "light";
    const preview = "none";

    const size = {
        width: document.body.getBoundingClientRect().width,
        height: document.body.getBoundingClientRect().height,
    };

    const picker = useRef(null);

    const [showMenu, setShowMenu] = useState(false);
    const [menuPos, setMenuPos] = useState("menu-up");

    const show = () => {

        let location = {
            x: picker.current.getBoundingClientRect().x,
            y: picker.current.getBoundingClientRect().y,
        }

        if(location.y < size.height/2) {
            setMenuPos("menu-down");
        } else {
            setMenuPos("menu-up");
        }

        setShowMenu(!showMenu);

    }

    return (
        <div className="emoji-picker" ref={picker}>
            <span className="emoji-picker-btn" onClick={() => show()}>
                <Icon name="Happy"></Icon>
            </span>
            {
                showMenu ? (
                    <div className={`emoji-picker-menu ${menuPos}`}>
                        <Picker
                            data={data}
                            theme={theme}
                            previewPosition={preview}
                            onEmojiSelect={(emoji) => {
                                onEmojiSelect(emoji);
                                setShowMenu(false);
                            }}
                            onBlur={() => setShowMenu(false)}
                        ></Picker>
                    </div>
                ) : ""
            }
        </div>
    );
}

export default EmojiPicker;
