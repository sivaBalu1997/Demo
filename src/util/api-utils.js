import Store from "../redux/store";

export const getAuthHeader = () => {
  return {
    Authorization: 'bearer ' + Store?.getState()?.auth?.credentials?.accessToken,
    'Accept-Encoding': 'gzip, deflate, br',
    'Content-Type': 'application/json'
  };
};

