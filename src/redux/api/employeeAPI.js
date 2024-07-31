import Store from "../store";
import API from "./api";

export function fetchOutlets(merchantId) {
  const token = Store.getState().auth.credentials.accessToken;
  return API({
    method: "post",
    url: "/merchants/deviceRegister",
    data: {
      merchantId: merchantId,
      locationId: "",
      deviceIdentifier: "",
      deviceType: "",
    },
    headers: {
      Authorization: "bearer " + token,
    },
  })
}


//Create Employee
export function createEmployee(details) {
  const token = Store.getState().auth.credentials.accessToken;
  // const merchantId = Store.getState().auth.credentials.merchantId;
  return API({
    method: "post",
    url: `/merchants/staffs`, 
    data: details,
    headers: {
      Authorization: "bearer " + token,
    },
  })
}

//Get Employee
export function getEmployeeDetails() {
  const token = Store.getState().auth.credentials.accessToken;
  const merchantId = Store.getState().auth.credentials.merchantId;
  return API({
    method: "get",
    url: `/merchants/${merchantId}/staffs`,
    headers: {
      Authorization: "bearer " + token,
    },
  })
}

//Get Employee By ID
export function getEmployeeById(staffId) {
  const token = Store.getState().auth.credentials.accessToken;
  const merchantId = Store.getState().auth.credentials.merchantId;
  const staff = staffId

  return API({
    method: 'get',
    url: `/merchants/${merchantId}/staffs/${staff}`,
    headers: {
      Authorization: "bearer " + token,
    },
  })
}

//Remove Employee
export function removeEmployee(staffId) {
  const token = Store.getState().auth.credentials.accessToken;
  const staff = staffId
  return API({
    method: "delete",
    url: `/merchants/staffs/${staffId}`, 
    // data: details,
    headers: {
      Authorization: "bearer " + token,
    },
  })
}
export function manageUserAccess(details) {
  const token = Store.getState().auth.credentials.accessToken;
  return API({
    method: "put",
    url: "/merchants/manage/userAccess",
    data: details,
    headers: {
      Authorization: "bearer " + token,
    },
  })
}

export function updatePIN(details) {
 // console.log("Calling from API :::::");
  const token = Store.getState().auth.credentials.accessToken;
  return API({
    method: "put",
    url: `/staff?id=${details.id}&devicePin=${details.pin}`,
    headers: {
      Authorization: "bearer " + token,
    },
  })
}

//Roles and Functions
export const rolesAndFunctions = () => {
  const token = Store.getState().auth.credentials.accessToken;
  return API ({
    method: 'get',
    url: `/api-info`,
    headers: {
      Authorization: "bearer " + token,
    }
  })
}

//Block or Unblock employee
export const employeeStatus = ({staffId, isToBlock}) => {
  const token = Store.getState().auth.credentials.accessToken;
  const staff = staffId;
  
  return API ({
    method: 'patch',
    url:`/merchants/staffs/${staffId}?isToBlock=${isToBlock}`,
    headers: {
      Authorization: "bearer " + token,
    }
  })
}

//Edit Employee
export const editEmployee = (details) => {
  const token = Store.getState().auth.credentials.accessToken;

  return API ({
    method: 'put',
    url:`/merchants/staffs`,
    data:details,
    headers: {
      Authorization: "bearer " + token,
    }
  })
}
