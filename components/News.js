import React, { useState } from "react";
import style from "./News.module.css";
import { useRouter } from "next/router";

function News({ data, pageQuery }) {
  const router = useRouter();
  let pageNumArr = [];
  const page = () => {
    return parseInt(data.length / 10) + 1;
  };
  (() => {
    for (let i = 1; i < page() + 1; i++) {
      pageNumArr.push(i);
    }
  })();

  let dataArr = [];
  (() => {
    let startIndex = (pageQuery - 1) * 10;
    let lastIndex = startIndex + 9;
    let last = data.length - 1;
    const select = () => {
      if (data[lastIndex] === undefined) {
        return last;
      } else {
        return lastIndex;
      }
    };

    for (let i = startIndex; i <= select(); i++) {
      dataArr.push(data[i]);
    }
  })();

  return (
    <div className={style.news_main}>
      {dataArr.map((item) => {
        return (
          <li className={style.news_list}>
            <a target="_blank" href={item.link} className={style.news_item}>
              {item.name}
            </a>
          </li>
        );
      })}
      <section className={style.pageBox}>
        {pageNumArr.map((i) => (
          <div
            onClick={(e) => {
              router.push(`${i}`);
            }}
            className={
              parseInt(pageQuery) === i
                ? `${style.pageNumfocus}`
                : `${style.pageNum}`
            }
          >
            {i}
          </div>
        ))}
      </section>
    </div>
  );
}

export default News;
