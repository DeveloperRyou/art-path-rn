import axios from "axios";

interface ApiResponse {
  id: string;
  msg: string;
}

const url = "https://art-path.net";

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
  timeout: 0,
});

export default api;
export type { ApiResponse };
