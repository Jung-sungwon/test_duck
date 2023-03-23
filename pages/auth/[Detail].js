import React from "react";
import style from "../../styles/auth.module.css";
import jwt from "jsonwebtoken";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/router";

function auth(props) {
  const router = useRouter();
  const { Detail } = router.query;
  const clickHandler = () => {
    axios
      .post(`${process.env.siteUrl}/api/active`, { token: Detail })
      .then((res) => {
        toast(res.data.message);
      })
      .catch((e) => {
        toast(e.response.data.error);
      });
  };

  return (
    <div className={style.activeBoard}>
      <h1 className={style.activeTitle}>
        {" "}
        <span className={style.username}>{props.decode}</span> 님 계정을 활성화
        하시겠습니까?
      </h1>
      <div className={style.active} onClick={clickHandler}>
        활성화
      </div>
      <ToastContainer />
    </div>
  );
}

export default auth;

export async function getServerSideProps(context) {
  const secret = process.env.REACT_APP_SECRET;
  const { req } = context;
  const params = req.url.replace("/auth/", "");

  let decode = jwt.verify(params, secret, (err, decoded) => {
    if (err) {
      context.res.writeHead(302, { Location: "/auth/errorPage" });
      context.res.end();
    } else {
      const { name, email } = decoded;
      return name;
    }
  });

  return {
    props: { decode },
  };
}
