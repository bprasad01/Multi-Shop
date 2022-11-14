import axios from "axios";
import { login } from "../utils/config";

const apiEndPoint = login + "token";

export function setLogin(user) {
  const config = { headers: { "Content-Type": "application/json" } };
  return axios.post(
    apiEndPoint,
    {
      username: user.username,
      password: user.password,
    },
    config
  );
}
