import React, { useState } from "react";
import style from "./goldcalculate.module.css";

function GoldCalculate({ price }) {
  const [gold, setGold] = useState(0);
  const [calGold, setCalGold] = useState(0);

  const changeHandler = (e) => {
    const value = e.target.value;
    setGold(value);
  };

  const clickHandler = (e) => {
    let cal = gold * price;
    setCalGold(cal);
  };

  return (
    <div>
      <h3>금 계산기</h3>
      <p className={style.goldDes}>
        "금 한돈은 3.75g입니다. 한돈의 절반인 반돈은 1.875g이지만 소수점 세번째
        자리까지는 무게를 측정하는 저울에서 정확한 측정이 힘들기 때문에, 1돈
        단위로만 계산합니다."
      </p>
      <div className={style.inputgroup}>
        <input
          type="number"
          onChange={changeHandler}
          placeholder="돈(3.75g)단위로 입력해주세요."
          className={style.cal_input}
        />
        <span onClick={clickHandler} className={style.btn}>
          계산하기
        </span>
        <span className={style.result}>{`${calGold}원`}</span>
      </div>
    </div>
  );
}

export default GoldCalculate;
