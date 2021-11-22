import React, { createContext } from "react";
//먼저 createContext. export function 밖에서 써야함.
export const InfoContext = createContext();
//useContext
export const UserForm = {
  apikey: "8611fd29678269e033bf421a0db5f770",
  qestrnSeq: "6",
  trgetSe: "100208",
  name: "",
  gender: "",
  grade: "1",
  startDtm: new Date().getTime(),
  answers: "",
};

export default function UserInfo() {
  return <InfoContext.Provider value={UserForm} />;
}
