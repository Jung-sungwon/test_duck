import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import style from "../../../styles/detailupdate.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function DetailUpdate() {
  const router = useRouter();
  const [load, setLoad] = useState("Loading...");
  const [data, setData] = useState(" ");

  const ref = useRef();

  const { CKEditor, ClassicEditor } = ref.current || {};

  useEffect(() => {
    ref.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic/"),
    };
    setLoad(false);
  }, []);

  const id = router.query.postid;

  const clickHandler = (e) => {
    axios
      .post(`${process.env.siteUrl}/api/postupdate`, {
        postId: id,
        detail: data,
      })
      .then((res) => {
        toast(res.data.message);
      });
  };

  return (
    <div className={style.updateBoard}>
      <ToastContainer />
      <Head>
        <style>
          {`
              .ck-editor__editable{
                  height:400px;
              }
              `}
        </style>
      </Head>
      <h3 className={style.updateTitle}>글 수정</h3>

      <section className={style.updateSec}>
        {load ? (
          load
        ) : (
          <CKEditor
            editor={ClassicEditor}
            data=""
            onChange={(event, editor) => {
              const data = editor.getData();
              setData(data);
            }}
          />
        )}

        <button
          type="button"
          onClick={clickHandler}
          className={style.updateBtn}
        >
          확인
        </button>
      </section>
    </div>
  );
}

export default DetailUpdate;
