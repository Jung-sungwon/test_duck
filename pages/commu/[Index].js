import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import style from "../../styles/community.module.css";

function Index(props) {
  const [optionSel, setOptionSel] = useState(false);
  const [page, setPage] = useState([1]);
  const [pageArr, setPageArr] = useState(false);
  const [writeAuth, setWriteAuth] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.siteUrl}/api/getcookie`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "cookie_False") {
          setWriteAuth(false);
        } else {
          setWriteAuth(true);
        }
      });
  }, []);
  const option = () => {
    const addOption = () => {
      return (
        <div
          className={style.addOptionStyle}
          onClick={() => {
            if (writeAuth === true) {
              router.push("/commu/write");
            } else {
              if (typeof window !== "undefined") {
                alert("로그인 후 글을 작성해주세요.");
              }
            }
          }}
        >
          글 작성
        </div>
      );
    };
    return (
      <div
        className={style.comOption}
        onClick={() => {
          setOptionSel(!optionSel);
        }}
      >
        {optionSel ? addOption() : null}

        <div className={style.optionWi}></div>
        <div className={style.optionHe}></div>
      </div>
    );
  };
  const router = useRouter();
  const { Index } = router.query;

  //게시글 10개 단위로 하단에 페이지숫자 나누기.
  useEffect(() => {
    const maxPage = Math.ceil(props.list.length / 10);

    const arr = [];
    for (let i = 1; i <= maxPage; i++) {
      arr.push(i);
    }
    setPage(arr);
  }, []);

  useEffect(() => {
    if (Index === 1) {
      let pageData = props.list.slice(Index - 1, Index * 10);
      setPageArr(pageData);
    } else {
      let pageData = props.list.slice((Index - 1) * 10, Index * 10);
      setPageArr(pageData);
    }
  }, [Index]);

  return (
    <div className={style.comBoard}>
      <section className={style.postBoard}>
        {pageArr ? (
          pageArr.map((item, index) => {
            return (
              <li className={style.postBoardlist}>
                <span
                  onClick={() => {
                    router.push(`/commu/comDetail/${item.postId}`);
                  }}
                >
                  {item.postTitle}
                </span>{" "}
                <span>{item.name}</span>
              </li>
            );
          })
        ) : (
          <div>loading...</div>
        )}
      </section>
      <section className={style.pageNumSec}>
        {page.map((i) => {
          return (
            <span
              onClick={() => {
                router.push(`./${i}`);
              }}
              className={style.pageNum}
            >
              {i}
            </span>
          );
        })}
      </section>
      {option()}
    </div>
  );
}

export default Index;

export async function getServerSideProps() {
  let list = await axios
    .post(`${process.env.siteUrl}/api/postlist`)
    .then((res) => {
      return res.data.message;
    })
    .catch((e) => {
      //return e.response.data.error;
    });
  list.reverse();

  return {
    props: { list },
  };
}
