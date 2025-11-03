import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AnimeIndex from '../containers/anime';
import AnimeDetailIndex from '../containers/anime_detail';

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route element={<AnimeIndex/>} path="/"/>
            <Route element={<AnimeDetailIndex/>} path="/:id"/>
        </Routes>
    );
}

export default AppRouter;

