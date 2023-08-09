/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import axios from "axios";
import Card from "../../components/Card/Card";
import S from "./ListPage.module.scss";
import useStore, { ZState } from "../../store";

const ListPage = () => {
  const {
    photos,
    setPhotos,
    currentPage,
    setCurrentPage,
    totalCount,
    setTotalCount,
    isLoading,
    setIsLoading,
    scroll,
    setScroll,
  } = useStore((state: ZState) => state);

  useEffect(() => {
    if (isLoading) {
      if (photos.length < totalCount) {
        axios
          .get(`https://jsonplaceholder.typicode.com/albums/1/photos?_page=${currentPage}&_limit=20`)
          .then((res) => {
            setPhotos(res.data);
            setCurrentPage(currentPage + 1);
            setTotalCount(+res.headers["x-total-count"]);
          })
          .finally(() => setIsLoading(false));
      } else if ((photos.length = totalCount)) {
        setIsLoading(false);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.scrollTo(0, scroll.listPage);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [totalCount]);

  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    setScroll("listPage", scrollTop);
    if (scrollHeight - scrollTop - clientHeight < 100) {
      if (photos.length < totalCount) {
        setIsLoading(true);
      }
    }
  };

  return (
    <main className={S.main}>
      <section className={S.cards}>
        {photos.map((ph) => (
          <Card key={ph.id} card={ph} />
        ))}
      </section>
      {isLoading && <div className={S.loader}>Loading...</div>}
    </main>
  );
};

export default ListPage;
