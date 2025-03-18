import React, { useState } from 'react';
import "./style.scss";


interface SwitchableBoxProps {
    textOne: string;
    textTwo: string;
    isActive: boolean;
    toggleSwitch: () => void;
}

const SwitchableBox: React.FC<SwitchableBoxProps> = ({ textOne, textTwo, isActive, toggleSwitch }) => {
    return (
        <div className="switchable-box">
            <div
                className={`switchable-tab ${!isActive ? "active" : ""}`}
                onClick={!isActive ? undefined : toggleSwitch}
            >
                {textOne}
            </div>
            <div
                className={`switchable-tab ${isActive ? "active" : ""}`}
                onClick={isActive ? undefined : toggleSwitch}
            >
                {textTwo}
            </div>
        </div>
    );
};

export default SwitchableBox;
