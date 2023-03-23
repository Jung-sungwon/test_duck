import React, { useState, useEffect } from "react";
import style from "../styles/main.module.css";
import axios from "axios";
import Head from "next/head";
import RefreshIcon from "@mui/icons-material/Refresh";
import MainNews from "@/components/MainNews";
import LineGraph from "@/components/LineGraph";
import GoldCalculate from "@/components/GoldCalculate";

function index(props) {
  const clickHandler = (e) => {
    window.location.reload();
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
        </div>
        <section className={style.goldCal}>
          <GoldCalculate price={props.price} />
        </section>
        <section className={style.main_data}>
          <div className={style.newsboard}>
            <MainNews news={props.news} />
          </div>
          <div className={style.graph}>
            <LineGraph priceDatas={props.prices} />
          </div>
        </section>
      </div>
    </>
  );
}

export default index;

export async function getServerSideProps() {
  const priceData = axios
    .get(`${process.env.siteUrl}/api/price`)
    .then((res) => {
      return res.data[0].price;
    });

  const priceDatas = axios
    .get(`${process.env.siteUrl}/api/priceTotal`)
    .then((res) => {
      return res.data;
    });

  const newsData = axios.get(`${process.env.siteUrl}/api/news`).then((res) => {
    return res.data;
  });

  return {
    props: {
      price: await priceData,
      news: await newsData,
      prices: await priceDatas,
    },
  };
}
