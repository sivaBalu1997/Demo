import React, { useState, useEffect } from "react";

import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { clearEditEmployeeData, getEmployees } from "../../redux/actions/employeeActions";
import EmployeeList from "./EmployessList";
import logout from "../../assets/images/logout.png";
import { signOut } from "../../redux/actions/authActions";
import { clearMenuData } from "../../redux/actions/menuAction";
import "./employee.css";
import "./styles.css";

import close from '../../assets/images/close.png'
import searchImg from '../../assets/svg/searchImg.svg'




const Employees = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const credentials = useSelector((state) => state.auth.credentials);
  const selectedBranch = useSelector((state) => state.auth.selectedBranch);

  const employeeDetailsLoading = useSelector(
    (state) => state.employee.employeeDetailsLoading
  );
  const employeeDetailsFailure = useSelector(
    (state) => state.employee.employeeDetailsFailure
  );
  const employeeList = useSelector((state) => state.employee.employeeDetails);
  
  useEffect(() => {
    selectedBranch?.id && dispatch(getEmployees(selectedBranch?.id));
  }, [selectedBranch?.id]);

  useEffect(() => {
    setLoading(employeeDetailsLoading);
  }, [employeeDetailsLoading, employeeList]);

  const logoutUser = () => {
    dispatch(clearMenuData());
    localStorage.clear();
    dispatch(signOut());
    history.replace("/");
  }

  const Header = ()=>{
    return <div className="employeeHeaderContainer">
        <h3 className={"employeeHeading"}>Employees Management</h3>
        <div className={"employeeHeaderButtonContainer"} onClick={logoutUser}>
          <img src={logout} alt="Logout" height="20" /><span className="employeeLogoutText">&nbsp;&nbsp;&nbsp;Log Out</span>
        </div>
    </div>
  }

  const [searchInput, setSearchInput] = useState('')
  const [searchedData, setSearchedData] = useState([])


  useEffect(() => {
    if (searchInput === '') {
      setSearchedData(employeeList);
    } else {
      const filteredData = employeeList.filter(item => (
        item.firstName.toLowerCase().includes(searchInput.toLowerCase()) || 
        item.role.toLowerCase().includes(searchInput.toLowerCase())
      ));
      setSearchedData(filteredData);
    }
  }, [searchInput, employeeList]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
    if(!/^[A-Za-z\s]*$/.test(event.key)){
      event.preventDefault();
    }
  };

  const handleInputChange = (e) => {
    let value = e.target.value;
  
    if (value.startsWith(' ')) {
      value = value.trimStart();
    }
  
    setSearchInput(value);
  };

  const handleCloseSearch = () => {
    setSearchInput('')
  }

  const handleSearch = () => {
    if (searchInput !== '') {
      const filteredData = employeeList.filter(item => (
        item.firstName.toLowerCase().includes(searchInput.toLowerCase()) || 
        item.role.toLowerCase().includes(searchInput.toLowerCase())
      ));
      setSearchedData(filteredData);
    } else {
      setSearchedData(employeeList);
    }
  };


  return (
    <>
    <div className="employeeContainer">
      <Header/>
      <div className="employeeSearchContainer">
        <div className="employeeSearchBox">
          <input 
            type="text"  
            className="employeeSearchBar" 
            placeholder="Search"
            value={searchInput}  
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          {!searchInput ? 
            <img src={searchImg} alt="" onClick={handleSearch} style={{width:"25px", height:"25px", marginTop:"6px", marginRight:"5px"}} /> :
            <img src={close} alt="" onClick={handleCloseSearch} style={{width:"20px", height:"20px", marginTop:"10px", marginRight:"5px"}} />
          } 
        </div>
        <input type="submit" value='Add New' className="addBtn"  
          onClick={() => {
            dispatch(clearEditEmployeeData())
            history.push("/management/employees/add")
          }}/>
      </div>
      <EmployeeList loading={loading} employeeListData={searchInput !== '' ? searchedData: employeeList}/>
    </div>
    </>
  );
};

export default Employees;
