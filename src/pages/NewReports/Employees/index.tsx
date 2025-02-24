import StoreFilter from 'components/reportComponents/StoreFilter';
import React, { useState } from 'react';
import { ReactComponent as ArrowLeft } from "../../../assets/svg/r-arrow-left.svg";
import CustomBarChart from 'components/reportComponents/ReusableCharts/CustomBarChart';
import CardWithMiniGraph from 'components/reportComponents/CardWithMiniGraph';
import CustomDropdown from 'components/common/customDropdown';
import "./style.scss";

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

    const [showAllActivityTable, setShowAllActivityTable] = useState<boolean>(false);

    const [employeeList, setEmployeeList] = useState("Sales");

    const handleDropdownChangeStore = (selectedValue: string) => {
        setEmployeeList(selectedValue);
    };

    return (
        <div className='report-sales-employee-container'>
            <StoreFilter selectedDate={selectedDate} selectedStore={selectedStore} setSelectedDate={setSelectedDate} setSelectedStore={setSelectedStore} />
            <div className="employee-report-sales-overview-box-container-parent">
                <h2>Sales Overview</h2>
                <div className="select-employee-container">
                    <p>Select employee</p>
                    <div className="select-employee-dropdown">
                        <CustomDropdown
                            options={[
                                { value: "All", label: "All" },
                                { value: "Lloyd Forger", label: "Lloyd Forger" },
                                { value: "Anya Forger", label: "Anya Forger" },
                                { value: "Daybreak", label: "Daybreak" },
                                { value: "stuart little", label: "stuart little" },
                            ]}
                            value={"Sales"}
                            className="category-dropdown"
                            onSelect={handleDropdownChangeStore}
                        />
                    </div>
                </div>
                <div className="employee-report-sales-overview-box-container">
                    <CardWithMiniGraph cardTitle="Total Sales" cardValue={8500.90} isMonetary={true} loader={false} />
                    <CardWithMiniGraph cardTitle="Net Sales" cardValue={6990.90} isMonetary={true} loader={false} />
                    <CardWithMiniGraph cardTitle="Total Tax" cardValue={425.00} isMonetary={true} loader={false} />
                    <CardWithMiniGraph cardTitle="Total Tips" cardValue={250.00} isMonetary={true} loader={false} />
                    <CardWithMiniGraph cardTitle="Gratuity" cardValue={350.00} isMonetary={true} loader={false} />
                    <CardWithMiniGraph cardTitle="Transactions" cardValue={2135} isMonetary={false} loader={false} />
                    <CardWithMiniGraph cardTitle="Discount" cardValue={155.50} isMonetary={true} loader={false} />
                    <CardWithMiniGraph cardTitle="Cancelled" cardValue={80.00} isMonetary={true} loader={false} />
                </div>
            </div>
            {!showAllActivityTable ? <CustomBarChart
                data={chartData}
                tooltipData={tooltipData}
                barColor="#67823D"
                barStyle={customBarStyle}
                showGrid={true} // Enable grid
                gridColor="#ccc" // Light gray grid
                gridStrokeWidth={0.5} // Subtle grid lines
                kpiTitle='All Activity'
                showRelatedTable={showAllActivityTable}
                setShowRelatedTable={setShowAllActivityTable}
            /> : "Hi From Table"}
            <button className='back-to-chart-btn'><ArrowLeft />Back</button>
        </div>
    );
};

export default Employees;