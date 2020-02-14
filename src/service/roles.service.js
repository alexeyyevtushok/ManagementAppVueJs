import axios from "axios";

export const getRoles = async api => {
  return await axios.get(api);
};
