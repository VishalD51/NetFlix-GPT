import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="movie-container">
      <h1 className="title">{title}</h1>
      <div className="movie-list">
        <div className="movies">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
