import { create } from 'zustand';
import { IPhoto } from './types';


export interface ZState {
  photos: IPhoto[];
  setPhotos: (value: IPhoto[]) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  totalCount: number;
  setTotalCount: (value: number) => void;
  favorites: IPhoto[];
  setFavorites: (value: IPhoto[]) => void;
  addToFavorites: (value: IPhoto) => void;
  removeFromFavorites: (value: IPhoto) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  scroll: {
    dashboardPage: number;
    listPage: number;
  },
  setScroll: (page: string, value: number) => void
}

const useStore = create<ZState>((set) => ({
  photos: [],
  currentPage: 1,
  totalCount: 0,
  favorites: [],
  isLoading: true,
  scroll: {
    dashboardPage: 0,
    listPage: 0,
  },

  setPhotos: (value: IPhoto[]) =>
    set((state: ZState) => ({
      ...state,
      photos: [...state.photos, ...value]
    })),

  setCurrentPage: (value: number) =>
    set((state: ZState) => ({
      ...state,
      currentPage: value
    })),

  setTotalCount: (value: number) =>
    set((state: ZState) => ({
      ...state,
      totalCount: value
    })),

  setFavorites: (value: IPhoto[]) =>
    set((state: ZState) => ({
      ...state,
      favorites: [...value]
    })),

  addToFavorites: (value: IPhoto) =>
    set((state: ZState) => ({
      ...state,
      favorites: [...state.favorites, value]
    })),

  removeFromFavorites: (value: IPhoto) =>
    set((state: ZState) => ({
      ...state,
      favorites: [...state.favorites.filter((fav) => fav.id !== value.id)]
    })),

  setIsLoading: (value: boolean) =>
    set((state: ZState) => ({
      ...state,
      isLoading: value
    })),

  setScroll: (page: string, value: number) =>
    set((state: ZState) => ({
      ...state,
      scroll: {
        ...state.scroll,
        [page]: value
      }
    })),


}));

export default useStore;
