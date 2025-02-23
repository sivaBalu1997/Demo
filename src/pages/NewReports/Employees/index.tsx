import StoreFilter from 'components/reportComponents/StoreFilter';
import React, { useState } from 'react';
import "./style.scss";
import CustomBarChart from 'components/reportComponents/ReusableCharts/CustomBarChart';

const Employees: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState({ label: "Yesterday", value: "Yesterday" });
    const [selectedStore, setSelectedStore] = useState({ label: "A2B Princeton", value: "A2B Princeton" });

    // Chart Data
    const chartData = [
        { name: "Add discount", value: 240.5 },
        { name: "Others", value: 180.0 },
        { name: "Complementary", value: 320.75 },
        { name: "Remove Gratuity", value: 200.0 },
    ];

    // Tooltip Data
    const tooltipData = {
        "Add discount": { tooltipContent: "Discount applied successfully!" },
        "Others": { tooltipContent: "Miscellaneous changes recorded." },
        "Complementary": { tooltipContent: "This item was given for free." },
        "Remove Gratuity": { tooltipContent: "Gratuity charges removed." },
    };

    // Custom Bar Style
    const customBarStyle = {
        borderRadius: "8px",
    };
    return (
        <div className='report-sales-employee-container'>
            <StoreFilter selectedDate={selectedDate} selectedStore={selectedStore} setSelectedDate={setSelectedDate} setSelectedStore={setSelectedStore} />
            <CustomBarChart
                data={chartData}
                tooltipData={tooltipData}
                barColor="#67823D"
                barStyle={customBarStyle}
                showGrid={true} // Enable grid
                gridColor="#ccc" // Light gray grid
                gridStrokeWidth={0.5} // Subtle grid lines
                kpiTitle='All Activity'
            />
        </div>
    );
};

export default Employees;