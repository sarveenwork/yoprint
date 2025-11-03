import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState, AnimeActionTypes } from '../types';
import { AnyAction } from 'redux';

type AppDispatch = ThunkDispatch<RootState, unknown, AnimeActionTypes | AnyAction>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

