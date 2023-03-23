import React, { useState } from "react";
import style from "./signup.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [modal, setModal] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
  });

  if (typeof window !== "undefined") {
    if (modal) {
      window.scrollTo(0, 800);
    }
  }

  const inputDatas = (name) => (e) => {
    setUserData({ ...userData, [name]: e.target.value });
  };

  const submitData = () => {
    axios
      .post(`${process.env.siteUrl}/api/signup`, userData)
      .then((res) => {
        toast(res.data.message);
      })
      .catch((e) => {
        toast(e.response.data.message);
      });

    setUserData({ email: "", password: "", name: "" });
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
            onChange={inputDatas("email")}
            value={userData.email}
          />
          <input
            type="password"
            placeholder="password"
            onChange={inputDatas("password")}
            value={userData.password}
          />
          <input
            type="text"
            placeholder="name"
            onChange={inputDatas("name")}
            value={userData.name}
          />
          <button type="button" onClick={submitData}>
            Signup
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
        SignUp
        <ToastContainer />
      </div>
      {modal ? clickHandler() : null}
    </>
  );
}

export default SignUp;
