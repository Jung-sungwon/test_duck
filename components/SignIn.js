import React, { useState } from "react";
import style from "./signup.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import { Link } from "next/link";

function SignIn() {
  const [modal, setModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  if (typeof window !== "undefined") {
    if (modal) {
      window.scrollTo(0, 800);
    }
  }

  const changeHandler = (name) => (e) => {
    setUserData({ ...userData, [name]: e.target.value });
  };

  const clickSignin = async () => {
    await axios
      .post(`${process.env.siteUrl}/api/signin`, userData, {
        withCredentials: true,
      })
      .then((res) => {
        toast(res.data.message);

        setModal(!modal);
      })
      .catch((e) => {});

    if (typeof window !== undefined) {
      location.reload();
    }

    setUserData({ email: "", password: "" });
  };

  const clickHandler = () => {
    return (
      <section className={style.signupBack}>
        <div className={style.signupBoard}>
          <div
            onClick={() => {
              setModal(!modal);
            }}
          >
            X
          </div>
          <input
            type="email"
            placeholder="E-mail"
            onChange={changeHandler("email")}
            value={userData.email}
          />
          <input
            type="password"
            placeholder="password"
            onChange={changeHandler("password")}
            value={userData.password}
          />

          <button type="button" onClick={clickSignin}>
            Signin
          </button>
        </div>
      </section>
    );
  };

  return (
    <>
      <div
        onClick={() => {
          setModal(!modal);
        }}
        className={style.signupBtn}
      >
        SignIn
      </div>
      {modal ? clickHandler() : null}
    </>
  );
}

export default SignIn;
