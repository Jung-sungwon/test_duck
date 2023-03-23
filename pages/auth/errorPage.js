import React from "react";
import style from "../../styles/error.module.css";

function errorPage() {
  return (
    <div className={style.errBoard}>
      <h1>
        토큰이 만료되었습니다.
        <br />
        <br /> 가입을 다시 시도해주세요.
      </h1>
    </div>
  );
}

export default errorPage;
