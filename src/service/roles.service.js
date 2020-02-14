import axios from "axios";

export const getRoles = async api => {
  return await axios.get(api);
};

export const setRole = async (api, data) => {
  return await axios.post(api, data);
};
