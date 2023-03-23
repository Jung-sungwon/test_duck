import React from "react";
import style from "./logout.module.css";
import { useCookies } from "react-cookie";
import axios from "axios";

function Logout() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const clickHandler = async () => {
    await axios
      .get(`${process.env.siteUrl}/api/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("로그아웃 ");
      });

    if (typeof window !== undefined) {
      location.reload();
    }
  };
  return (
    <span className={style.logout} onClick={clickHandler}>
      Logout
    </span>
  );
}

export default Logout;
