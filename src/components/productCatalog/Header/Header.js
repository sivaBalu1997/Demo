import React, { useContext, useState } from "react";
import "../Header/Header.scss";
import SearchBox from "../SearchBox/SearchBox1";
import filterIcon from "../../../assets/svg/filter.svg";
import Excel from "../../../assets/svg/Excel.svg";
import publish from "../../../assets/svg/publish.svg";
import DownloadExcel from "../../../assets/images/ExcelDownload.png";
import { Contextpagejs } from "../../../pages/productCatalog/contextpage";
import { useHistory } from "react-router-dom";
import Menu120 from "../Menu120/Menu120";
import Filter from "../Filter/Filter";
import ArrowHover from "../../../assets/svg/ArrowHover.svg";
import DatePicker from "react-datepicker";
import plusicon from '../../../assets/svg/plusIcon.svg'
import { removeDataRequest } from "redux/productCatalog/productCatalogActions";
import { useDispatch } from "react-redux";
const Header = () => {
  const { isExpanded } = useContext(Contextpagejs);
  const [filterSelected, setFilterSelected] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const handleFilter = () => {
    setFilterSelected(!filterSelected);
  };

  const handleClick = () => {
    dispatch(removeDataRequest());
    history.push("/productCatalog/PrimaryDetails");
  };

  return (
    <div className={isExpanded ? "Header-Container1" : "Header-Container"}>
      <div className="Header-Heading-Search-Filter-Container">
        <Menu120 />

        <SearchBox />
      </div>
      <div
        onClick={() => handleClick()}
        className={isExpanded ? "Add-Item-Container1" : "Add-Item-Container"}
      >
        {/* <p className="Add-Item-Heading-Plus">+</p> */}
       
        <span className="Add-Item-Heading-Plus">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.4141 8.08594H8.08594V14.4141C8.08594 14.7377 7.82361 15 7.5 15C7.17639 15 6.91406 14.7377 6.91406 14.4141V8.08594H0.585938C0.262324 8.08594 0 7.82361 0 7.5C0 7.17639 0.262324 6.91406 0.585938 6.91406H6.91406V0.585938C6.91406 0.262324 7.17639 0 7.5 0C7.82361 0 8.08594 0.262324 8.08594 0.585938V6.91406H14.4141C14.7377 6.91406 15 7.17639 15 7.5C15 7.82361 14.7377 8.08594 14.4141 8.08594Z" fill="#FFFFFF"/>
</svg>

        </span>
        <p className="Add-Item-Heading-header">Add Item</p>
      </div>
    </div>
  );
};

export default Header;