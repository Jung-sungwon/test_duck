import React, { useEffect, useState } from "react";
import style from "../styles/mypage.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserEdit from "@/components/UserEdit";

function Admin() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });
  const [modal, setModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.siteUrl}/api/getcookie`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.role === "subscriber") {
          router.push("/subscriber");
        } else if (res.data.role === undefined) {
          router.push("/");
        }
        setUser(res.data);
      })
      .catch((e) => {
        router.push("/");
      });
  }, []);

  const changeHandler = (name) => (e) => {
    setUser({ ...user, [name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(user);
    console.log("submit");
    axios
      .post(`${process.env.siteUrl}/api/userupdate`, user)
      .then((res) => {
        toast(res.data.message);
      })
      .catch((e) => {
        toast(res.data.error);
      });
  };

  const editModal = () => {
    setModal(!modal);
  };

  return (
    <section className={style.mypageBoard}>
      <section className={style.userInfo}>
        <form className={style.userFrom} onSubmit={submitHandler} method="POST">
          <div>
            <label for="email">email</label>
            <input type="text" readOnly value={user.email} name="email" />
          </div>
          <div>
            <label for="password">password</label>
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={changeHandler("password")}
            />
          </div>
          <div>
            <label for="name">name</label>
            <input
              type="text"
              placeholder={user.name}
              name="name"
              onChange={changeHandler("name")}
            />
          </div>
          <div>
            <label for="role">role</label>
            <input type="text" readOnly value={user.role} name="role" />
          </div>
          <button type="submit" className={style.userBtn}>
            개인정보 수정
          </button>
          <div className={style.userEdit} onClick={editModal}>
            회원 정보수정
          </div>
        </form>
        {modal ? <UserEdit exit={editModal} /> : null}
      </section>
      <ToastContainer />
    </section>
  );
}

export default Admin;
