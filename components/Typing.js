import React, { useEffect, useRef, useState } from "react";
import style from "components/typing.module.css";
import { useRouter } from "next/router";

function Typing() {
  let title = "golden_goose!";
  let titleArr = title.split("");
  const [toggle, setToggle] = useState(false);
  const [word, setWord] = useState("");

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setToggle(!toggle);
    }, 700);
  }, [toggle]);

  let btnRef = useRef();

  useEffect(() => {
    let tiArr = "";
    let fun = (arr) => {
      if (arr.length > word.length) {
        tiArr = tiArr + arr.shift();
        setWord(tiArr);
        setTimeout(() => {
          fun(arr);
        }, 500);
      }
    };
    fun(titleArr);
  }, []);

  useEffect(() => {
    let btn = btnRef.current;
    let observer = new IntersectionObserver((e) => {
      e[0].target.style.opacity = 1;
    });
    observer.observe(btn);
  }, []);

  return (
    <div>
      <div className={`${style.gold} ${toggle ? null : style.active}`}>
        {word}
      </div>
      <div
        className={style.innerRoad}
        ref={btnRef}
        onClick={() => {
          router.push("/");
        }}
      >
        입장하기
      </div>
    </div>
  );
}

export default Typing;
