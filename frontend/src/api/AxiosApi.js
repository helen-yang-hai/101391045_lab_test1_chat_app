import axios from "axios";

const BASE_URL= "http://localhost:8081"
const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 2000,
    headers: {'X-Custom-Header': 'foobar'}
  });

export default instance;