import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../redux/slice/movieSlice";
import { useEffect } from "react";
import { API_OPTION } from "../utils/constant";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upComingMovies = useSelector((store) => store.movies.upComingMovies);

  const getUpcomingMovie = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_OPTION
    );
    const json = await data.json();
    dispatch(addUpcomingMovies(json.results));
  };
  useEffect(() => {
    !upComingMovies && getUpcomingMovie();
  }, [upComingMovies]);
};

export default useUpcomingMovies;
