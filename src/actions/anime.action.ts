import {
  FETCH_ANIME_REQUEST,
  FETCH_ANIME_SUCCESS,
  FETCH_ANIME_FAILURE,
  SET_ANIME_FILTER,
  FetchAnimeRequestAction,
  FetchAnimeSuccessAction,
  FetchAnimeFailureAction,
  SetAnimeFilterAction,
  AnimeFilter,
  Anime,
  Pagination,
} from '../types';

export const fetchAnimeRequest = (abortController?: AbortController): FetchAnimeRequestAction => ({
  type: FETCH_ANIME_REQUEST,
  abortController,
});

export const fetchAnimeSuccess = (anime: Anime[], pagination: Pagination): FetchAnimeSuccessAction => ({
  type: FETCH_ANIME_SUCCESS,
  payload: { anime, pagination },
});

export const fetchAnimeFailure = (error: string): FetchAnimeFailureAction => ({
  type: FETCH_ANIME_FAILURE,
  payload: error,
});

export const setAnimeFilter = (filter: Partial<AnimeFilter>): SetAnimeFilterAction => ({
  type: SET_ANIME_FILTER,
  payload: filter,
});

