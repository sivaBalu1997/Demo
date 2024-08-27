import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter, useHistory, Router } from "react-router-dom";
import store from "./redux/store";
import { Provider, useDispatch, useSelector } from "react-redux";

import "./styles/app.scss";
import EmptyMenu from "./components/menuItems/EmtyMenu";
import MenuItems from "./components/menuItems";
import MenuDetials from "./components/menuDetails";
import MenuCustomization from "./components/menuCustomization";
import AddCustomizationInput from "./components/menuCustomization/AddCustomizationInput";
import ReviewMenu from "./components/reviewMenu";
import Auth from "./components/Auth";
import BasicDetails from "./components/Auth/BasicDetails";
import Business from "./components/business";
import Employees from "./components/employees";
import RoleAccess from "./components/roles";
import ResetPassword from "./components/Auth/ResetPassword";
import { CREDENTIALS } from "./shared/constants";
import { ClearSignIn, signOut, storeCredentials } from "./redux/actions/authActions";
import NotFound from "./components/notFound";
import Menu from "./components/menu";
import { clearMenuData } from "./redux/actions/menuAction";
import { ToastContainer } from "react-toastify";
import { RootState } from "redux/reducers/rootReducer";
import Routers from './Routers'
import CustomerInsights from "components/reports-sprint99/screens/CustomerInsights";

interface Credentials {
  accessToken: string
  address: string
  attributes: string
  authUserId: string 
  blockUser: boolean
  businessName: string
  dateOfBirth: string
  defaultDeviceId: string
  defaultFunctionalityAccessUpdated: boolean
  deviceIdentifier: string
  devicePin: number
  deviceType: string
  education: string 
  email: string
  favoriteTables: string[]
  firstName: string
  fullName: string
  id: string
  isSuperAdminAccess: boolean
  isTempPassword: boolean
  lastName: string
  locationId: string
  merchantId: string
  mobileNumber: string
  myTableViewSectionExists: boolean
  nickName: string
  outlet: string
  password: string
  refreshToken: string
  role: string
  toUseNickName: boolean
  topicToSubscribe: string
  userAccessInfoList: string
  userId: string
}

const Loader = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const credentails: Credentials | null = JSON.parse(localStorage.getItem('CREDENTIALS') || 'null');
    if (credentails) {
      dispatch(storeCredentials(credentails));
    }
  }, []);
  return <span></span>;
};

const App = () => {
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--wHeight",
      window.innerHeight + "px"
    );

    document.documentElement.style.setProperty(
      "--wWidth",
      window.innerWidth + "px"
    );
    //console.log(window.innerHeight, window.innerWidth);
  }, []);

    useEffect(() => {
      const handleContextMenu = (event: MouseEvent) => {
        event.preventDefault();
      };
      document.addEventListener('contextmenu', handleContextMenu);
        return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
      };
    }, []);

  const authState = useSelector((state:RootState) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(()=>{
    const fetchData = async(): Promise<void> => {
      const credentails: Credentials | null = JSON.parse(localStorage.getItem('CREDENTIALS') || 'null');
    if (!credentails?.accessToken) {
    //  console.log('60');
    //     history.push("/management/employees");
    //   }else{ 
        dispatch(clearMenuData());
        localStorage.clear();
        dispatch(signOut());
        history.replace('/')
      }
    }
    fetchData()
  }, [authState?.credentials])

  return (
   <>
      <Loader />
      <div className="app">
        <div className="main-section">
        <ToastContainer autoClose={3000} />
            <Switch>
              <Route exact path="/" component={Auth} />
              <Route path="/reset" component={ResetPassword} />
              <Route path="/basic-details" component={BasicDetails} />
              <Route path="/business" component={Business} />
              <Route path="/roles" component={RoleAccess} />
              <Route path="/menu" component={EmptyMenu} />
              <Route path="/menulist" component={MenuItems} />
              <Route path="/menudetails" component={MenuDetials} />
              <Route path="/menuCustomization" component={MenuCustomization} />
              <Route path="/menuInput" component={AddCustomizationInput} />
              <Route path="/review" component={ReviewMenu} />
              <Route path="/notFound" component={NotFound} />
              <Route path="/management" component={Menu} />
            </Switch>
            <Routers />
        </div>
      </div>
    </>
  );
}

export default App;

// Restaurant_Owner, Restaurant_Manager, System_Admin, Owner, Cashier,Supervisor, Waiter, Host, Employee
