import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../redux/slice/movieSlice";
import { useEffect } from "react";
import { API_OPTION } from "../utils/constant";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);

  const getNowPlayingMovie = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      API_OPTION
    );
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  };
  useEffect(() => {
    !popularMovies && getNowPlayingMovie();
  }, []);
};

export default usePopularMovies;
