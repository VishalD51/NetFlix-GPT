import React from "react";
import { useSelector } from "react-redux";
import MovieList from "../common/MovieList";

const GptMovieSuggestion = () => {
  const { movieNames, movieResults } = useSelector((state) => state.GptSearch);
  if (!movieNames) return null;

  return (
    <div className="search-result">
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList
            index={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
