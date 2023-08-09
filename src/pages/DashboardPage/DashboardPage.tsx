/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import S from "./DashboardPage.module.scss";
import useStore, { ZState } from "../../store";

const DashboardPage = () => {
  const { favorites, totalCount, scroll, setScroll } = useStore((state: ZState) => state);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.scrollTo(0, scroll.dashboardPage);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [totalCount]);

  const handleScroll = () => {
    const { scrollTop } = document.documentElement;
    setScroll("dashboardPage", scrollTop);
  };

  return (
    <main className={S.main}>
      <section className={S.statistics}>
        <p>
          количество элементов в избранном: <span>{favorites.length}</span>
        </p>
        <p>
          вес картинок всех элементов в избранном в сумме: <span>{"?"} мегабайт</span>
        </p>
      </section>
      <Dashboard />
    </main>
  );
};

export default DashboardPage;
