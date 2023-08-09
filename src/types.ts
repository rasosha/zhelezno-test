export interface IPhoto {
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string,
}

export interface ICardProps {
  favorites: IPhoto[];
  setFavorites: React.Dispatch<React.SetStateAction<IPhoto[]>>;
}
