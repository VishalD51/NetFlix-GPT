import { useDispatch, useSelector } from "react-redux";
import { API_OPTION } from "../utils/constant";
import { addMovieVideo } from "../redux/slice/movieSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const movieVideo = useSelector((store) => store.movies.movieVideo);
  const getMovieVideos = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTION
    );
    const json = await data.json();

    const filterData = json.results?.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addMovieVideo(trailer));
  };
  useEffect(() => {
    !movieVideo && getMovieVideos();
  }, []);
};
export default useMovieTrailer;
