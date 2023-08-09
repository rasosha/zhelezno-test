import useStore, { ZState } from "../../store";
import { IPhoto } from "../../types";
import S from "./Card.module.scss";

const Card = ({ card }: { card: IPhoto }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useStore((state: ZState) => state);
  const isInFavorites = favorites.find((fav) => fav.id === card.id);

  const handleLike = () => {
    if (!isInFavorites) {
      addToFavorites(card);
    } else {
      removeFromFavorites(card);
    }
  };

  return (
    <div className={S.body}>
      <img className={S.image} src={card.thumbnailUrl} alt={`id-${card.id}`} />
      <h2 className={S.title}>{card.title}</h2>
      <p className={S.id}>{card.id}</p>
      <button className={`${S.btn} ${isInFavorites ? S.btnRemove : S.btnAdd}`} onClick={handleLike}>
        {"+"}
      </button>
    </div>
  );
};

export default Card;
