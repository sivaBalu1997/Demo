import React, { useState, useRef, useEffect } from "react";
import "./style.scss";

type ReportsChartDropDownProps = {
    options: string[]; // List of options for the dropdown
    // defaultOption: string; // Default option to display
    onSelect: (selectedOption: string) => void; // Callback when an option is selected
};

export const ReportsChartDropDown: React.FC<ReportsChartDropDownProps> = ({ options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>(options[0]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="rep-dropdown" ref={dropdownRef}>
            <div
                className="rep-dropdown-header"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <p>{selectedOption}</p>
                <p>{isOpen ? "▲" : "▼"}</p>
            </div>

            {isOpen && (
                <div className="rep-dropdown-options">
                    {options.map((option) => (
                        <div
                            key={option}
                            className="rep-dropdown-option"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
