import React from "react";
import useMovieTrailer from "../../hooks/useMovieTrailer";
import { useSelector } from "react-redux";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.movieVideo);
  useMovieTrailer(movieId);
  return (
    <div className="video-background">
      <iframe
        className=""
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?&autoplay=1&mute=1&loop=1&controls=0&autoplay=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
