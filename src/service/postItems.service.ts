/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios from "axios";

export const postItems = async (api: string, data: any) => {
  return await axios.post(api, data).catch(err => console.error(err));
};
