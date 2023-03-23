import React from "react";
import style from "./footer.module.css";

function Footer() {
  return (
    <div className={style.foot_board}>
      <section className={style.foot_main}>golden_goose</section>
      <section className={style.footerDetail}>
        <p>
          {" "}
          * golden_goose는 각종 사이트에서 금 정보들을 수집하여 제공하고
          있습니다.
        </p>
        <br />
        <p>* 자료삭제 요청 및 문의사항은 podo0817@naver.com로 보내주세요.</p>
        <br />
        <p>
          * 각 자료의 정확성은 golden_goose에서 보장 할 수 없으며, 해당 사이트의
          정보로 인한 손실에 대한 책임은 전적으로 투자자 본인에게 있음을
          알려드립니다.
        </p>
      </section>
    </div>
  );
}

export default Footer;
