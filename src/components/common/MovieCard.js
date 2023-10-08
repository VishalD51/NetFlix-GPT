import { IMG_CDN_URL } from "../../utils/constant";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return;
  return (
    <div className="movie-card">
      <img alt="movie card" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};

export default MovieCard;
