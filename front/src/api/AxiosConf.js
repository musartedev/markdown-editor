import axios from "axios";

const URL = process.env.URL || "http://localhost:3001";

const instance = axios.create({
  baseURL: URL,
  timeout: 30000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  }
});

export default instance;
