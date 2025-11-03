import { Action } from 'redux';

export interface AnimeImage {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface AnimeImages {
  jpg: AnimeImage;
  webp: AnimeImage;
}

export interface AnimeGenre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Anime {
  mal_id: number;
  url: string;
  images: AnimeImages;
  trailer: {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
  };
  approved: boolean;
  titles: Array<{
    type: string;
    title: string;
  }>;
  title: string;
  title_english: string | null;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number | null;
  status: string;
  airing: boolean;
  aired: {
    from: string | null;
    to: string | null;
    prop: {
      from: {
        day: number | null;
        month: number | null;
        year: number | null;
      };
      to: {
        day: number | null;
        month: number | null;
        year: number | null;
      };
    };
    string: string;
  };
  duration: string;
  rating: string;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number | null;
  members: number | null;
  favorites: number | null;
  synopsis: string | null;
  background: string | null;
  season: string | null;
  year: number | null;
  broadcast: {
    day: string | null;
    time: string | null;
    timezone: string | null;
    string: string | null;
  };
  producers: AnimeGenre[];
  licensors: AnimeGenre[];
  studios: AnimeGenre[];
  genres: AnimeGenre[];
  explicit_genres: AnimeGenre[];
  themes: AnimeGenre[];
  demographics: AnimeGenre[];
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface AnimeResponse {
  data: Anime[];
  pagination: Pagination;
}

export interface AnimeDetailResponse {
  data: Anime;
}

export interface AnimeFilter {
  page: number;
  q: string;
}

export interface AnimeState {
  isLoading: boolean;
  anime: Anime[];
  pagination: Pagination | null;
  filter: AnimeFilter;
  error: string | null;
}

export interface RootState {
  anime: AnimeState;
}

export const FETCH_ANIME_REQUEST = 'FETCH_ANIME_REQUEST';
export const FETCH_ANIME_SUCCESS = 'FETCH_ANIME_SUCCESS';
export const FETCH_ANIME_FAILURE = 'FETCH_ANIME_FAILURE';
export const SET_ANIME_FILTER = 'SET_ANIME_FILTER';

export interface FetchAnimeRequestAction extends Action<typeof FETCH_ANIME_REQUEST> {
  abortController?: AbortController;
}

export interface FetchAnimeSuccessAction extends Action<typeof FETCH_ANIME_SUCCESS> {
  payload: {
    anime: Anime[];
    pagination: Pagination;
  };
}

export interface FetchAnimeFailureAction extends Action<typeof FETCH_ANIME_FAILURE> {
  payload: string;
}

export interface SetAnimeFilterAction extends Action<typeof SET_ANIME_FILTER> {
  payload: {
    page?: number;
    q?: string;
  };
}

export type AnimeActionTypes =
  | FetchAnimeRequestAction
  | FetchAnimeSuccessAction
  | FetchAnimeFailureAction
  | SetAnimeFilterAction;

