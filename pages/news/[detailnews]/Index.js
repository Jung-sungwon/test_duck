import React from "react";
import News from "@/components/News";
import style from "../../../styles/news.module.css";
import axios from "axios";
import { useRouter } from "next/router";

function news(props) {
  const router = useRouter();
  const { detailnews } = router.query;

  return (
    <div className={style.newsBoard}>
      <News data={props.news} pageQuery={detailnews} />
    </div>
  );
}

export default news;

export async function getServerSideProps() {
  const newsData = axios.get(`${process.env.siteUrl}/api/news`).then((res) => {
    return res.data;
  });

  return {
    props: {
      news: await newsData,
    },
  };
}
