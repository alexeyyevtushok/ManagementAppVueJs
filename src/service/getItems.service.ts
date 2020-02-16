/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios from "axios";

export const getItems = async (api: string) => {
  return await axios.get(api);
};

export const getTableData = async (
  api: string,
  transformFunc: (a: any) => void
) => {
  const res = await axios.get(api);
  return transformFunc(res.data);
};
