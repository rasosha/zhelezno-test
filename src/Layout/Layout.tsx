import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import S from "./Layout.module.scss";

const Layout = () => {
  return (
    <div className={S.body}>
      <header className={S.header}>
        <NavLink to={"/"} className={S.link}>
          Страница дэшбоард
        </NavLink>
        <NavLink to={"list"} className={S.link}>
          Список загрузки элементов
        </NavLink>
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
