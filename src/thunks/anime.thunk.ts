import { ThunkAction } from 'redux-thunk';
import { RootState, AnimeActionTypes } from '../types';
import * as animeActions from '../actions/anime.action';
import animeService, { ApiError } from '../api/anime/anime';
import { Dispatch } from 'redux';
import axios from 'axios';

type AppDispatch = Dispatch<AnimeActionTypes>;

let currentAbortController: AbortController | null = null;

export const fetchAnime = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  AnimeActionTypes
> => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    if (currentAbortController) {
      currentAbortController.abort();
    }

    const abortController = new AbortController();
    currentAbortController = abortController;

    const { filter } = getState().anime;

    dispatch(animeActions.fetchAnimeRequest(abortController));

    try {
      const response = await animeService.getAnime(filter, abortController.signal);

      if (abortController.signal.aborted) {
        return;
      }

      const { status, data } = response;

      if (status === 200) {
        if (!data || !data.data || !Array.isArray(data.data)) {
          dispatch(animeActions.fetchAnimeFailure('Invalid API response format'));
          return;
        }

        if (!abortController.signal.aborted && currentAbortController === abortController) {
          dispatch(animeActions.fetchAnimeSuccess(data.data, data.pagination));
        }
      } else {
        dispatch(animeActions.fetchAnimeFailure(`Unexpected status code: ${status}`));
      }
    } catch (error) {
      if (axios.isCancel(error) || abortController.signal.aborted) {
        return;
      }

      if (error instanceof ApiError) {
        let errorMessage = error.message;
        
        if (error.isRateLimit) {
          errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
        } else if (error.isNetworkError) {
          errorMessage = 'Network error. Please check your internet connection.';
        }
        
        dispatch(animeActions.fetchAnimeFailure(errorMessage));
      } else if (error instanceof Error) {
        dispatch(animeActions.fetchAnimeFailure(error.message || 'An error occurred'));
      } else {
        dispatch(animeActions.fetchAnimeFailure('An unexpected error occurred'));
      }
    }
  };
};

