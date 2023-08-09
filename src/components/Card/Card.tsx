import axios from "axios";
import useStore, { ZState } from "../../store";
import { IPhoto } from "../../types";
import S from "./Card.module.scss";

const Card = ({ card }: { card: IPhoto }) => {
  const {
    favorites,
    addToFavorites,
    removeFromFavorites,
    addFileSizeById,
    removeFileSizeById,
    fileSizes,
  } = useStore((state: ZState) => state);
  const isInFavorites = favorites.find((fav) => fav.id === card.id);

  const getFileSize = async (url: string) => {
    const api = "https://cors.eu.org/";
    const size = await axios.get(api + url).then((res) => res.headers["content-length"]);
    return +size;
  };

  const handleLike = async () => {
    if (!isInFavorites) {
      addToFavorites(card);
      const size = await getFileSize(card.url);
      addFileSizeById(card.id, size);
      console.log("add :>> ");
    } else {
      removeFromFavorites(card);
      removeFileSizeById(card.id);
      console.log("remove :>> ");
    }
  };

  return (
    <div className={S.body}>
      <img className={S.image} src={card.thumbnailUrl} alt={`id-${card.id}`} />
      <div className={S.info}>
        <h2 className={S.title}>{card.title}</h2>
        <a href={card.url}>открыть оригинал</a>
        {fileSizes.hasOwnProperty(card.id) && <p>{fileSizes[card.id]} байт</p>}
      </div>
      <p className={S.id}>{card.id}</p>
      <button className={`${S.btn} ${isInFavorites ? S.btnRemove : S.btnAdd}`} onClick={handleLike}>
        {"+"}
      </button>
    </div>
  );
};

export default Card;
