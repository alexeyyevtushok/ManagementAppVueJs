import axios from "axios";

export const changeUserRole = async (api, data) => {
  return await axios.put(api, data);
};
