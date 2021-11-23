import { ConfigContext } from "antd/lib/config-provider";
import React, { createContext } from "react";
import App from "../App";
//먼저 createContext. export function 밖에서 써야함.
export const UserContext = createContext();
//useContext
export default function UserInfo({ children }) {
  const startUser = {
    apikey: "8611fd29678269e033bf421a0db5f770",
    qestrnSeq: "6",
    trgetSe: "100208",
    name: "",
    gender: "",
    grade: "1",
    startDtm: new Date().getTime(),
    answers: "",
  };
  return (
    <UserContext.Provider value={startUser}>{children}</UserContext.Provider>
  );
}
