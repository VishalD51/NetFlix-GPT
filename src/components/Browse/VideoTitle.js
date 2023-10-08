import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="video-title">
      <h1 className="title">{title}</h1>
      <p className="overview">{overview}</p>
      <div className="btn-container">
        <button className="">Play</button>
        <button className="">More Info</button>
      </div>
    </div>
  );
};

export default VideoTitle;
