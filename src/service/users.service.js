import axios from "axios";

export const changeUserRole = async (api, data) => {
  return await axios.put(api, data);
};

export const addUsers = async (api, data) => {
  return await axios.post(api, data);
};
