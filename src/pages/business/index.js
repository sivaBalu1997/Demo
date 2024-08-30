import React, { useState } from "react";
import user from "../../assets/images/user_one.png";
import logout from "../../assets/images/logout.png";
import "../../styles/business.scss";
import { MdAdd } from "react-icons/md";
import TextInput from "../../components/common/TextInput";
import CustomDropdown from "../../components/common/customDropdown";
import Button from "../../components/common/Button";
import { clearMenuData } from "../../redux/menu/menuAction";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/auth/authActions";
import SidePanel from "../SidePanel";

const options = ["City", "City", "City"];
const optionsTwo = ["State", "State", "State"];

const Business = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [addBranch, setBranch] = useState(false);

  const [defaultOptions, setDefaultOptions] = useState("City");
  const [defaultOptionsTwo, setDefaultOptionsTwo] = useState("State");

  const onSelect = (option) => {
    setDefaultOptions(option);
  };

  const onSelectNext = (option) => {
    setDefaultOptionsTwo(option);
  };

  const logoutUser = () => {
    dispatch(clearMenuData());
    localStorage.clear();
    dispatch(signOut());
    history.replace("/");
  };

  return (
    <>
      <SidePanel />
      <div className="business_sec">
        <div id="business_header">
          <h3>Business Details</h3>
          <p onClick={logoutUser}>
            {" "}
            <img src={logout} alt="Logout" height="20" /> &nbsp; Logout
          </p>
        </div>

        <div className="user_card">
          <div className="first_sec">
            <img src={user} alt="user" />
            <div>
              <p>Jack Sparrow</p>
              <span>Owner</span>
            </div>
          </div>
          <div>
            <p>Jack Sparrow</p>
            <span>Owner</span>
          </div>
          <div>
            <button>Edit</button>
          </div>
        </div>

        <div className="add_branch">
          <div>
            <span onClick={() => setBranch(true)}>
              <MdAdd /> Add Branch
            </span>
          </div>
          {addBranch ? (
            <form>
              <TextInput type="text" placeholder="Name" />
              <TextInput type="text" placeholder="Role" />
              <TextInput type="text" placeholder="Branch Area" />
              <div>
                <TextInput type="text" placeholder="Address Line 1" />
                <TextInput type="text" placeholder="Address Line 2" />
              </div>
              <div className="input_flex">
                <CustomDropdown
                  options={options}
                  value={defaultOptions}
                  onSelect={onSelect}
                />
                <CustomDropdown
                  options={optionsTwo}
                  value={defaultOptionsTwo}
                  onSelect={onSelectNext}
                />
              </div>
              <div>
                <TextInput type="text" placeholder="Pincode" />
                <TextInput type="text" placeholder="Country" />
              </div>
              <div className="bottom_cta">
                <Button
                  type={"submit"}
                  value={"Save"}
                  backgroundColor={"#67833E"}
                  color={"#fff"}
                />
              </div>
            </form>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Business;
