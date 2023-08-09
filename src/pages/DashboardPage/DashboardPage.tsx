/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import S from "./DashboardPage.module.scss";
import useStore, { ZState } from "../../store";
// import axios from "axios";

const DashboardPage = () => {
  const { favorites, totalCount, scroll, setScroll, fileSizes } = useStore((state: ZState) => state);
  const [myFileSizes, setMyFileSizes] = useState(0);

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

  useEffect(() => {
    const sizesArr = Object.values(fileSizes);
    const sum = sizesArr.reduce((acc, curr) => acc + curr, 0);
    setMyFileSizes(sum);
  }, [fileSizes, favorites]);

  return (
    <main className={S.main}>
      <section className={S.statistics}>
        <p>
          количество элементов в избранном: <span>{Object.values(fileSizes).length}</span>
        </p>
        <p>
          вес картинок всех элементов в избранном в сумме:
          {favorites.length === Object.values(fileSizes).length ? (
            <span
              className={S.size}
              title={`${(myFileSizes / 1024).toFixed(2)} килобайт или ${myFileSizes} байт `}
              onClick={() => {
                console.log(fileSizes);
                console.log(
                  "sum:>>",
                  Object.values(fileSizes).reduce((acc, curr) => acc + curr, 0)
                );
              }}
            >
              {(myFileSizes / (1024 * 1024)).toFixed(2)} мегабайт
            </span>
          ) : (
            <span>...</span>
          )}
        </p>
      </section>
      <Dashboard />
    </main>
  );
};

export default DashboardPage;
