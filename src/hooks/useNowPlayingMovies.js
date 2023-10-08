import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../redux/slice/movieSlice";
import { useEffect } from "react";
import { API_OPTION } from "../utils/constant";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  const getNowPlayingMovie = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_OPTION
    );
    const json = await data.json();
    dispatch(addNowPlayingMovies(json.results));
  };
  useEffect(() => {
    !nowPlayingMovies && getNowPlayingMovie();
  }, []);
};

export default useNowPlayingMovies;
