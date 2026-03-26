import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MovieHeader from './components/movieheader';
import MovieList from './components/movielist';
import Movie from './components/movie';
import Authentication from './components/authentication';
import MyTickets from './components/mytickets';
import Watchlist from './components/watchlist';
import Settings from './components/settings';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <MovieHeader />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movielist" element={<MovieList />} />
          <Route path="/movie/:movieId" element={<Movie />} />
          <Route path="/signin" element={<Authentication />} />
          <Route path="/tickets" element={<MyTickets />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;