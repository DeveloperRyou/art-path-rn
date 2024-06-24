import axios from "axios";

interface ApiResponse {
  id: string;
  msg: string;
}

const url = "http://3.39.210.241";

const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json",
    "Access-Control-Allow-Credentials": "true",
  },
  validateStatus: (status) => {
    return status < 300;
  },
});

export default api;
export type { ApiResponse };
