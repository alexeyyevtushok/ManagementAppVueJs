import axios from "axios";

export const getTableData = async (api, transformFunc) => {
  const res = await axios.get(api);
  return transformFunc(res.data);
};
