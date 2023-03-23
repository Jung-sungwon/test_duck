import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "../../../styles/comdetail.module.css";
import axios from "axios";
import Comment from "../../../components/Comment";
import { useCookies } from "react-cookie";

function detail(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [postDetail, setPostDetail] = useState({
    name: "",
    postTitle: "",
    detail: "",
  });
  const router = useRouter();
  useEffect(() => {
    axios
      .post(`${process.env.siteUrl}/api/comdetail`, { postId: props.Index })
      .then((res) => {
        setPostDetail(res.data);
      });
  }, []);

  const postDel = (e) => {
    if (cookies.token !== undefined) {
      axios
        .post(
          `${process.env.siteUrl}/api/authcheck`,
          {
            postId: props.Index,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data) {
            axios
              .post(`${process.env.siteUrl}/api/postdel`, { id: props.Index })
              .then(() => {});
            if (typeof window !== "undefined") {
              alert("삭제 되었습니다.");
              router.back();
            }
          } else {
            if (typeof window !== "undefined") {
              alert("삭제 권한이 없습니다.");
            }
          }
        });
    } else if (typeof window !== "undefined") {
      alert("삭제 권한이 없습니다.");
    }
  };

  const updateCheck = (e) => {
    if (cookies.token !== undefined) {
      axios
        .post(
          `${process.env.siteUrl}/api/authcheck`,
          {
            postId: props.Index,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data) {
            router.push({
              pathname: "/commu/comDetail/detailUpdate",
              query: { postid: props.Index },
            });
          } else {
            if (typeof window !== "undefined") {
              alert("수정 권한이 없습니다.");
            }
          }
        });
    } else {
      if (typeof window !== "undefined") {
        alert("수정 권한이 없습니다.");
      }
    }
  };

  return (
    <div>
      <section className={style.detailBoard}>
        <section className={style.postInfo}>
          <span className={style.title}>{postDetail.postTitle}</span>
          <span className={style.postName}>{postDetail.name}</span>
        </section>
        <section className={style.detailValue}>
          {postDetail.detail
            .replaceAll("&nbsp;", " ")
            .replaceAll("<p>", "\n")
            .replaceAll("</p>", "")}
        </section>
        <section className={style.allBtn}>
          <button
            type="button"
            onClick={() => {
              router.back();
            }}
            className={style.listBtn}
          >
            목 록
          </button>

          <button className={style.updateBtn} onClick={updateCheck}>
            수 정
          </button>
          <button className={style.delBtn} onClick={postDel}>
            삭 제
          </button>
        </section>
      </section>
      <Comment postId={props.Index} />
    </div>
  );
}

export default detail;

export async function getServerSideProps(context) {
  const { query } = context;
  const { Index } = query;
  return {
    props: {
      Index,
    },
  };
}
