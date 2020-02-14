import axios from "axios";

export const getManagers = async api => {
  return await axios.get(api);
};
