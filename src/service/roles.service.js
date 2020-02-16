import axios from "axios";

export const getRoles = async api => {
  return await axios.get(api);
};

export const setRole = async (api, data) => {
  console.log(data);
  return await axios.post(api, data);
};
