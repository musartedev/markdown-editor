import axios from "./AxiosConf";

export const create = title => axios.post(`/documents`, { title });
export const get = () => axios.get(`/documents`);
export const update = (id, rawText) =>
  axios.put(`/documents/${id}`, { rawText });
export const remove = id => axios.delete(`/documents/${id}`);
