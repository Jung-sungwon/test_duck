import style from "../../../styles/write.module.css";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";

const write = () => {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [userData, setUserData] = useState({ name: "", email: "", title: "" });

  const router = useRouter();

  const changeHandler = (e) => {
    setUserData({ ...userData, title: e.target.value });
  };

  useEffect(() => {
    axios
      .get(`${process.env.siteUrl}/api/getcookie`, {
        withCredentials: true,
      })
      .then((res) => {
        const { name, email } = res.data;
        setUserData({ name, email });
      })
      .catch((e) => {});

    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  const [data, setData] = useState("");

  const clickHandler = (e) => {
    axios
      .post(`${process.env.siteUrl}/api/userpost`, {
        detail: data.replace("<p>", "").replace("</p>", ""),
        userData,
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((e) => {
        alert(e.response.data.error);
      });
  };

  return (
    <div className={style.writeBoard}>
      <Head>
        <style>{`
        .ck-editor__editable {height:400px;}
        `}</style>
      </Head>
      <form>
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          className={style.editTitle}
          onChange={changeHandler}
        />
        {editorLoaded ? (
          <CKEditor
            editor={ClassicEditor}
            data={data}
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              const data = editor.getData();
              setData(data);
            }}
          />
        ) : (
          <p>Loading...</p>
        )}
        <section className={style.btnSec}>
          <button type="submit" onClick={clickHandler}>
            글 작성
          </button>
          <button
            type="button"
            onClick={() => {
              router.push("/commu/1");
            }}
          >
            글 목록
          </button>
        </section>
      </form>
    </div>
  );
};

export default write;
