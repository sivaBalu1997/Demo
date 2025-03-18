//MultiSwitchableBox

import React from 'react'
import './style.scss';

interface MultiSwitchableBoxProps {
    texts: string[];
    activeIndex: number;
    onSwitch: (index: number) => void;
  }

const MultiSwitchableBox:React.FC<MultiSwitchableBoxProps> = ({ texts, activeIndex=0, onSwitch }) => {
  return (
    <div className="multi-switchable-box">
      {texts.map((text, index) => (
        <div
          key={index}
          className={`multi-switchable-tab ${activeIndex === index ? "active" : ""}`}
          onClick={() => onSwitch(index)}
        >
          {text}
        </div>
      ))}
    </div>
  );
}

export default MultiSwitchableBox
