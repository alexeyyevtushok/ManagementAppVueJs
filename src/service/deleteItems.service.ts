/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios from "axios";

export const deleteTableItem = (
  api: string,
  index: number,
  onSuccess: () => void
) => {
  axios
    .delete(`${api}/${index}`)
    .then(onSuccess)
    .catch(err => console.error(err));
};
