import React, { useEffect, useState } from "react";
import style from "./useredit.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function UserEdit({ exit }) {
  const [userList, setUserList] = useState([]);
  const [edit, setEdit] = useState({ bool: false, i: "", index: "" });
  const [del, setDel] = useState(false);

  useEffect(() => {
    axios
      .post(`${process.env.siteUrl}/api/userlist`)
      .then((res) => {
        setUserList(res.data);
      })
      .catch((e) => {});
  }, []);

  useEffect(() => {
    if (edit.bool === false) {
      axios
        .post(`${process.env.siteUrl}/api/adminupdate`, edit)
        .then((res) => {
          toast(res.data.message);
          if (typeof window !== undefined) {
            location.reload();
          }
        })
        .catch((e) => {
          //toast(res.data.error);
        });
    }
  }, [edit]);

  const delHandler = () => {
    setDel(!del);
  };

  const userDelete = () => {
    const deleteUser = () => {
      axios
        .post(`${process.env.siteUrl}/api/userdelete`, edit.i)
        .then((res) => {
          toast(res.data.message);
          if (typeof window !== "undefined") {
            location.reload();
          }
        });
    };
    return (
      <section className={style.userDelete}>
        <p>계정을 정말로 삭제하시겠습니까?</p>
        <section>
          <button onClick={deleteUser}>네</button>
          <button
            onClick={() => {
              setDel(!del);
            }}
          >
            아니오
          </button>
        </section>
      </section>
    );
  };

  const editModal = () => {
    return (
      <div className={style.editModalBoard}>
        <div
          className={style.modalExit}
          onClick={() => {
            setEdit({ ...edit, bool: false });
          }}
        >
          X
        </div>
        <h4 className={style.editModalTitle}>{edit.i.name} 유저의 정보</h4>
        <section className={style.editModalSec}>
          <span>권한 수정</span>
          <div className={style.roleBoard}>
            <span
              value="subscriber"
              onClick={(e) => {
                setEdit({
                  ...edit,
                  i: { ...edit.i, role: e.target.innerText },
                });
              }}
              id={style.roleSelect}
            >
              subscriber
            </span>
            <span
              value="admin"
              onClick={(e) => {
                setEdit({
                  ...edit,
                  i: { ...edit.i, role: e.target.innerText },
                });
              }}
              id={style.roleSelect}
            >
              admin
            </span>
          </div>

          <button type="button" onClick={delHandler}>
            계정 삭제
          </button>
        </section>
        {del ? userDelete() : null}
      </div>
    );
  };

  return (
    <div className={style.editBoard}>
      <div
        className={style.modalExit}
        onClick={() => {
          exit();
        }}
      >
        X
      </div>
      <h3 className={style.userList}>유저 목록</h3>
      <section className={style.infoSec}>
        <ul>
          {userList.map((i, index) => {
            return (
              <>
                <div className={style.tableDiv}>{i.name}</div>
                <table border="1" className={style.userTable}>
                  <tr>
                    <td className={style.userMail}>mail : {i.email}</td>
                    <td
                      className={style.userRole}
                      onClick={() => {
                        setEdit({ bool: true, i: i, index: index });
                      }}
                    >
                      권한 : {i.role}
                    </td>
                  </tr>
                </table>
              </>
            );
          })}
          {edit.bool ? editModal() : null}
        </ul>
      </section>
    </div>
  );
}

export default UserEdit;
