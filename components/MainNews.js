import React from "react";
import style from "./MainNews.module.css";
import Link from "next/link";

function MainNews(props) {
  const data = () => {
    const limitData = props.news.filter((item, index) => index < 6);
    return limitData.map((i, key) => {
      return (
        <li className={style.mainList}>
          <a href={i.link} key={key} target="_blank">
            {i.name}
          </a>
        </li>
      );
    });
  };
  return (
    <>
      {data()}
      <Link href="/news/1" className={style.add}>
        <div>더보기...</div>
      </Link>
    </>
  );
}

export default MainNews;
