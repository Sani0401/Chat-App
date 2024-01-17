import axios from "axios";

const Instance = axios.create({
  baseURL: "http://localhost:5000/",
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

export default Instance;
