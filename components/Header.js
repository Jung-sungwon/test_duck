import React, { useEffect, useState } from "react";
import style from "./Header.module.css";

function Header() {
  const [wiseState, setWiseState] = useState(0);
  const wise = [
    {
      name: "- 바뤼흐 스피노자",
      say: "가장 비참하고 보잘 것 없어보이는 사람들이 대개 가장 야심차고 질투가 많다.",
    },
    {
      name: "- 오프라 윈프리",
      say: "우리는 삶의 모든 측면에서 항상 '내가 가치있는 사람일까?' '내가 무슨 가치가 있을까?'라는 질문을 끊임없이 던지곤 합니다. 하지만 저는 우리가 날 때부터 가치있다 생각합니다.",
    },
    {
      name: "- 마하트마 간디",
      say: "세상에는 일곱 가지 죄가 있다. 노력 없는 부, 양심 없는 쾌락, 인격 없는 지식, 도덕성 없는 상업, 인성 없는 과학, 희생 없는 기도, 원칙 없는 정치가 그것이다.",
    },
    {
      name: "- 윌리엄 골드먼",
      say: "삶은 공평하지 않다. 다만 죽음보다는 공평할 뿐이다.",
    },
    {
      name: "- 벤자민 플랭클린",
      say: "오래 살기를 원하면 잘 살아라. 어리석음과 사악함이 수명을 줄인다.",
    },
    {
      name: "- 헬렌 켈러",
      say: "인생은 과감한 모험이던가, 아니면 아무 것도 아니다. ",
    },
    {
      name: "- 존 웨인",
      say: "인생은 본래 녹록지 않다. 하지만 멍청한 사람에게는 더욱 녹록지 않다.",
    },
    {
      name: "- 마크 트웨인",
      say: "좋은 책을 읽지 않는 사람은 책을 읽을 수 없는 사람보다 나을 바 없다.",
    },
    {
      name: "- 프리드리히 니체",
      say: "개선이란 무언가가 좋지 않다고 느낄 수 있는 사람들에 의해서만 만들어질 수 있다.",
    },
    { name: "- 맹자", say: "지성을 다하는 것이 곧 천도(天道)다" },
    {
      name: "- 벤 린지",
      say: "당신이 젊은이들을 위한 진로를 준비하기보다는 그 진로를 위해 준비시키는 데 더욱 노력해주길 간청한다.",
    },
    {
      name: "- 플라니 2세",
      say: "무위(無爲)라는 상태는 게으르지만 기분 좋기도 하다.",
    },
  ];

  useEffect(() => {
    setWiseState(parseInt(Math.random() * 11));
  }, []);

  return (
    <div className={style.headerMain}>
      <img src="/mout.png" alt="산" />
      <div className={style.wisebox}>
        <div className={style.wisesay}>{wise[wiseState].say}</div>
        <div className={style.wisename}>{wise[wiseState].name}</div>
      </div>
    </div>
  );
}

export default Header;
