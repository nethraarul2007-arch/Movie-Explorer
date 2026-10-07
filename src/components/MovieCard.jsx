import { Link } from "react-router-dom";
import { IMAGE_BASE } from "../api/tmdb.js";
import Rating from "./Rating.jsx";
import FavoriteButton from "./FavoriteButton.jsx";

export default function MovieCard({ movie }) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "Unknown year";
  return (
    <article className="card">
      <Link to={`/movie/${movie.id}`} className="card__link">
        {movie.poster_path ? (
          <img
            src={`${IMAGE_BASE}/w342${movie.poster_path}`}
            alt={`Poster for ${movie.title}`}
            loading="lazy"
            className="card__poster"
          />
        ) : (
          <div className="card__poster card__poster--empty">No poster</div>
        )}
        <div className="card__body">
          <h3 className="card__title">{movie.title}</h3>
          <p className="card__year">{year}</p>
          <Rating value={movie.vote_average} />
        </div>
      </Link>
      <FavoriteButton movie={movie} className="card__fav" />
    </article>
  );
}
