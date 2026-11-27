import axios from "axios";

const backendClient = axios.create({
  baseURL: "http://192.168.15.119:3000",
});

export default backendClient;
