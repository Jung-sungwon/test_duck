import React, { useEffect, useRef, useState } from "react";
import style from "../styles/landing.module.css";
import Typing from "@/components/Typing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { NextSeo } from "next-seo";

function Landing() {
  const [mid, setMid] = useState(false);

  const midRef = useRef();

  useEffect(() => {
    let observer = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        setMid(!mid);
      } else if (e[0].isIntersecting === false) {
        setMid(false);
      }
    });
    observer.observe(midRef.current);
  }, []);

  return (
    <div>
      <NextSeo
        title="golden_goose"
        description="금 데이터를 제공하는 커뮤니티입니다."
      />
      <section className={style.titleBoard}>
        <Typing />
      </section>
      <section className={style.middle}>
        <div
          className={`${style.detailBoard} ${mid ? style.active : null}`}
          ref={midRef}
        >
          <h3>금 소식을 편하게 보세요.</h3>
        </div>
        <div className={`${style.detailBoard2} ${mid ? style.active2 : null}`}>
          <h3>사람들과 소통을 할 수 있어요.</h3>
        </div>
      </section>
      <section className={style.last}>
        <div className={style.lastInner}>
          <div className={style.shadowBoard}>
            golden_goose는 여러분의 시간을 위해 금 관련 뉴스와 시세를 찾아
            정리해줍니다.
            <br></br>
            <br></br>
            golden_goose에서 사람들과 정보를 주고받으세요.
          </div>
        </div>
        <section className={style.footerSec}>
          <span>
            <FontAwesomeIcon icon={faQuoteLeft} />
            &nbsp;커뮤니티 구축&nbsp;
            <FontAwesomeIcon icon={faQuoteRight} />
          </span>
          <span>
            {" "}
            <FontAwesomeIcon icon={faQuoteLeft} />
            &nbsp; 금 시세 동향 추적 &nbsp;{" "}
            <FontAwesomeIcon icon={faQuoteRight} />
          </span>
          <span>
            {" "}
            <FontAwesomeIcon icon={faQuoteLeft} />
            &nbsp;금 관련 최신 뉴스 &nbsp;{" "}
            <FontAwesomeIcon icon={faQuoteRight} />
          </span>
          <FontAwesomeIcon icon="fa-solid fa-quote-left" />
        </section>
      </section>
    </div>
  );
}

export default Landing;
