/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios from "axios";

export const putItems = async (api: string, data: any) => {
  return await axios.put(api, data);
};
