import React from "react";
import MovieList from "../common/MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className="secondary-container">
      <div className="secondary-content">
        <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
        <MovieList title={"Top Rated"} movies={movies?.topRatredMovies} />
        <MovieList title={"Popular"} movies={movies?.popularMovies} />
        <MovieList title={"Upcoming"} movies={movies?.upComingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
