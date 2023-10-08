import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../redux/slice/movieSlice";
import { useEffect } from "react";
import { API_OPTION } from "../utils/constant";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatredMovies = useSelector((store) => store.movies.topRatredMovies);

  const getTopRatedMovie = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      API_OPTION
    );
    const json = await data.json();
    dispatch(addTopRatedMovies(json.results));
  };
  useEffect(() => {
    !topRatredMovies && getTopRatedMovie();
  }, []);
};

export default useTopRatedMovies;
