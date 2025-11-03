import {
  FETCH_ANIME_REQUEST,
  FETCH_ANIME_SUCCESS,
  FETCH_ANIME_FAILURE,
  SET_ANIME_FILTER,
  AnimeActionTypes,
  AnimeState,
} from '../types';

const initialState: AnimeState = {
  isLoading: true,
  anime: [],
  pagination: null,
  filter: {
    page: 1,
    q: '',
  },
  error: null,
};

const animeReducer = (state = initialState, action: AnimeActionTypes): AnimeState => {
  switch (action.type) {
    case FETCH_ANIME_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_ANIME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        anime: action.payload.anime,
        pagination: action.payload.pagination,
        error: null,
      };
    case FETCH_ANIME_FAILURE:
      return {
        ...state,
        isLoading: false,
        anime: [],
        pagination: null,
        error: action.payload,
      };
    case SET_ANIME_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default animeReducer;

