import React from "react";
import style from "./layout.module.css";

function Layout(props) {
  return <div className={style.layout}>{props.children}</div>;
}

export default Layout;
