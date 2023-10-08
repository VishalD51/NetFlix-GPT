import React from "react";
import Header from "../Header/Header";
import useNowPlayingMovies from "../../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../../hooks/usePopularMovie";
import useTopRatedMovies from "../../hooks/useTopRatedMovies";
import useUpcomingMovies from "../../hooks/useUpcomingMovies";
import { useSelector } from "react-redux";
import "./browse.scss";
const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  const GptSearchShow = useSelector((store) => store.GptSearch.GptSearchShow);
  return (
    <div className="browse-main">
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
