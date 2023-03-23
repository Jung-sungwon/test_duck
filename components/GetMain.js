import React, { useState } from "react";
import style from "../styles/main.module.css";
import axios from "axios";
import Head from "next/head";
import RefreshIcon from "@mui/icons-material/Refresh";

function index(props) {
  const [data, setData] = useState(false);

  const clickHandler = (e) => {
    setData(!data);
  };

  return (
    <>
      <div className={style.main_board}>
        <div className={style.ic_box} onClick={clickHandler}>
          <RefreshIcon className={style.ic} />
        </div>
        <div>
          <section className={style.main_sec}>
            현재 금시세(1돈, 3.75g 기준) : {props.price} 원
          </section>
          <section className={style.main_sec}>
            금 계산기 영역(현재 금시세 * 금 무게)
          </section>
        </div>
        <section className={style.main_data}>
          <div>일 기준으로 최고가 기록(최근 10일)</div>
          <div>
            뉴스 api만든 후 3개의 뉴스 제목 띄우기나머지는 더보기 칸 만들어서
            뉴스 링크로 이동시키고
          </div>
        </section>
      </div>
    </>
  );
}

export default index;
