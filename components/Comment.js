import React, { useEffect, useRef, useState } from "react";
import style from "./comment.module.css";
import axios from "axios";

function Comment({ postId }) {
  const [rerender, serRerender] = useState(false);
  const [comment, setComment] = useState("");
  const [comList, setComList] = useState([]);
  const [user, setUser] = useState({ name: "", email: "" });

  const changeHandler = (e) => {
    setComment(e.target.value);
  };

  const clickHandler = (e) => {
    if (user.email !== "") {
      axios.post(`${process.env.siteUrl}/api/comment`, {
        comData: comment,
        id: postId,
        name: user.name,
        email: user.email,
      });
    } else {
      if (typeof window !== "undefined") {
        alert("로그인 후 댓글을 남겨주세요.");
      }
    }
    setComment("");
    serRerender(!rerender);
  };

  useEffect(() => {
    axios
      .get(`${process.env.siteUrl}/api/getcookie`, { withCredentials: true })
      .then((res) => {
        const { name, role, email } = res.data;

        if (email !== undefined) {
          setUser({ name, email });
        }
      });
  }, []);

  //코멘트 정보 가져오기
  useEffect(() => {
    axios
      .post(`${process.env.siteUrl}/api/loadcomment`, { id: postId })
      .then((res) => {
        setComList(res.data);
      });
  }, [rerender]);

  return (
    <div className={style.commentBoard}>
      <section className={style.comSec}>
        {comList.map((i) => {
          return (
            <div className={style.comDetailBoard}>
              <p className={style.comDetail}>{i.commentDetail}</p>
              <div className={style.comName}>{i.name}</div>
            </div>
          );
        })}
      </section>
      <form className={style.commentForm}>
        <textarea
          type="text"
          placeholder="댓글을 입력하세요."
          onChange={changeHandler}
          value={comment}
        />
        <button type="button" onClick={clickHandler}>
          등록
        </button>
      </form>
    </div>
  );
}

export default Comment;
