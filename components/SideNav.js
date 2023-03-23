import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import style from "./sidenav.module.css";
import Link from "next/link";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { useCookies } from "react-cookie";
import Logout from "./Logout";
import axios from "axios";
import { useRouter } from "next/router";

function SideNav(props) {
  const [hide, setHide] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [BurgerStyle, setBurgerStyle] = useState(true);
  const [cookieCheck, setCookieCheck] = useState(true);
  const [role, setRole] = useState("");
  const [tok, setTok] = useState("");
  const [name, setName] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.siteUrl}/api/getcookie`, {
        withCredentials: true,
      })
      .then((res) => {
        setTok(res.data);
      })
      .catch((e) => {});

    if (cookies.token !== undefined) {
      setCookieCheck(true);
    } else {
      setCookieCheck(false);
    }
  }, []);

  useEffect(() => {
    setName(tok.name);
    setRole(tok.role);
  }, [tok]);

  if (typeof window !== "undefined") {
    let judgement = false;
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300 && !judgement) {
        setBurgerStyle(false);
      } else {
        setBurgerStyle(true);
      }
    });
  }

  const clickHandler = () => {
    setHide(!hide);
  };

  const hamburger = () => {
    return (
      <section className={BurgerStyle ? null : style.topnav}>
        <span
          className={BurgerStyle ? style.burger : style.burgerBom}
          onClick={clickHandler}
        >
          <div></div>
          <div></div>
          <div></div>
        </span>
        <section
          className={style.userInfoSec}
          style={BurgerStyle ? { display: "none" } : null}
        >
          {cookieCheck ? (
            <span className={style.myPage}>
              <section
                onClick={() => {
                  if (role === "subscriber") {
                    router.push("/subscriber");
                  } else if (role === "admin") {
                    router.push("/Admin");
                  }
                }}
              >
                {name}
              </section>{" "}
              님 환영합니다.
            </span>
          ) : (
            <SignUp />
          )}

          {cookieCheck ? <Logout /> : <SignIn />}
        </section>
      </section>
    );
  };

  return (
    <div className={style.topBoard}>
      {hide ? hamburger() : null}

      <div className={hide ? ` ${style.board_none} ` : style.board}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap"
            rel="stylesheet"
          />
        </Head>
        <span className={hide ? null : style.btn} onClick={clickHandler}>
          <div></div>

          <div></div>
        </span>
        <div style={hide ? { display: "none" } : null}>
          <Link href="/" className={style.side_link}>
            <section className={style.sideMenu}>Main</section>
          </Link>
          <Link href="/news/1" className={style.side_link}>
            <section className={style.sideMenu}>News</section>
          </Link>
          <Link href="/commu/1" className={style.side_link}>
            <section className={style.sideMenu}>Community</section>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
