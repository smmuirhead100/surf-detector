import './style/dropdown.css'
import React, { useState } from 'react';
import caret from '../../assets/caret-down-solid.svg' 

export default function Dropdown({question, hiddenText}) {

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
        console.log("toggle");
        console.log(isVisible);
    };

    return (
        <div className='dropdown--container'>
            <div className='dropdown--question'>
                {question}
                <button onClick={toggleVisibility} className='dropdown--button'>
                    <img src={caret}/>
                </button>
            </div>
            {isVisible && (
                <div className='dropdown--hidden--text'>
                {hiddenText}
                </div>
            )}
        </div>
    )
}