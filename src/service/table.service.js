import axios from "axios";

export const getTableData = async (api, transformFunc) => {
  const res = await axios.get(api);
  return transformFunc(res.data);
};

export const deleteTableItem = (api, index, onSuccess) => {
  axios
    .delete(`${api}/${index}`)
    .then(onSuccess)
    .catch(err => console.error(err));
};
