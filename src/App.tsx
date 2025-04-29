import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./styles/app.scss";
import { signOut, storeCredentials } from "./redux/auth/authActions";
import { clearMenuData } from "./redux/menu/menuAction";
import { ToastContainer } from "react-toastify";
import { RootState } from "./redux/rootReducer";
import Routers from "../src/Routers";
import { Contextpage } from "pages/productCatalog/contextpage";
import MainPage from "pages/productCatalog/MainPage/MainPage";
import { clearReportData } from "redux/newReports/newReportsActions";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

// Set the font globally for all charts
ChartJS.defaults.font.family = "'Poppins', sans-serif";
interface Credentials {
  accessToken: string;
  address: string;
  attributes: string;
  authUserId: string;
  blockUser: boolean;
  businessName: string;
  dateOfBirth: string;
  defaultDeviceId: string;
  defaultFunctionalityAccessUpdated: boolean;
  deviceIdentifier: string;
  devicePin: number;
  deviceType: string;
  education: string;
  email: string;
  favoriteTables: string[];
  firstName: string;
  fullName: string;
  id: string;
  isSuperAdminAccess: boolean;
  isTempPassword: boolean;
  lastName: string;
  locationId: string;
  merchantId: string;
  mobileNumber: string;
  myTableViewSectionExists: boolean;
  nickName: string;
  outlet: string;
  password: string;
  refreshToken: string;
  role: string;
  toUseNickName: boolean;
  topicToSubscribe: string;
  userAccessInfoList: string;
  userId: string;
}

const Loader = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const credentails: Credentials | null = JSON.parse(
      localStorage.getItem("CREDENTIALS") || "null"
    );
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
  }, []);

  // useEffect(() => {
  //   const handleContextMenu = (event: MouseEvent) => {
  //     event.preventDefault();
  //   };
  //   document.addEventListener("contextmenu", handleContextMenu);
  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //   };
  // }, []);

  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const credentails: Credentials | null = JSON.parse(
        localStorage.getItem("CREDENTIALS") || "null"
      );
      if (!credentails?.accessToken) {
        dispatch(clearMenuData());
            dispatch(clearReportData())
        localStorage.clear();
        dispatch(signOut());
        history.replace("/");
      }
    };
    fetchData();
  }, [authState?.credentials]);

  return (
    <>
      <Loader />
      <div className="app">
        <div className="main-section">
          <ToastContainer autoClose={3000} limit={1}/>
          <Routers />
        </div>
      </div>
    </>
  );
};

export default App;

// Restaurant_Owner, Restaurant_Manager, System_Admin, Owner, Cashier,Supervisor, Waiter, Host, Employee
