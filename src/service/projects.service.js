import axios from "axios";

export const setProjectName = async (api, data) => {
  return await axios.post(api, data).catch(err => console.error(err));
};

export const setManager = async (api, data) => {
  return await axios.post(api, data).catch(err => console.error(err));
};
