import { Link, useNavigate, useParams } from "react-router-dom";
import { IMAGE_BASE, getMovieDetails } from "../api/tmdb.js";
import useFetch from "../hooks/useFetch.js";
import Rating from "../components/Rating.jsx";
import FavoriteButton from "../components/FavoriteButton.jsx";
import MovieGrid from "../components/MovieGrid.jsx";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const formatRuntime = (mins) => (mins ? `${Math.floor(mins / 60)}h ${mins % 60}m` : null);

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: movie, loading, error, retry } = useFetch((signal) => getMovieDetails(id, signal), [id]);

  if (loading) return <Loader label="Loading movie" />;
  if (error) return <ErrorMessage message={error} onRetry={retry} />;
  if (!movie) return null;

  const trailer = movie.videos?.results?.find((v) => v.site === "YouTube" && v.type === "Trailer");
  const cast = movie.credits?.cast?.slice(0, 8) || [];
  const director = movie.credits?.crew?.find((c) => c.job === "Director");
  const similar = movie.similar?.results?.slice(0, 6) || [];
  const facts = [movie.release_date?.slice(0, 4), formatRuntime(movie.runtime), director && `Directed by ${director.name}`].filter(Boolean);

  return (
    <article className="details">
      <button type="button" className="btn btn--ghost" onClick={() => navigate(-1)}>
        Back
      </button>

      {movie.backdrop_path && (
        <img className="details__backdrop" src={`${IMAGE_BASE}/w1280${movie.backdrop_path}`} alt="" />
      )}

      <div className="details__main">
        {movie.poster_path ? (
          <img className="details__poster" src={`${IMAGE_BASE}/w500${movie.poster_path}`} alt={`Poster for ${movie.title}`} />
        ) : (
          <div className="details__poster card__poster--empty">No poster</div>
        )}

        <div className="details__info">
          <h1>{movie.title}</h1>
          {movie.tagline && <p className="details__tagline">{movie.tagline}</p>}
          <p className="details__facts">{facts.join(" · ")}</p>

          <Rating value={movie.vote_average} votes={movie.vote_count} size="lg" />

          <ul className="tags" aria-label="Genres">
            {movie.genres.map((g) => (
              <li key={g.id}><Link to={`/?genre=${g.id}`}>{g.name}</Link></li>
            ))}
          </ul>

          <h2>Overview</h2>
          <p>{movie.overview || "No overview is available for this movie yet."}</p>

          <div className="actions">
            <FavoriteButton movie={movie} />
            {trailer && (
              <a className="btn" href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noreferrer">
                Watch trailer
              </a>
            )}
          </div>

          {cast.length > 0 && (
            <>
              <h2>Cast</h2>
              <ul className="cast">
                {cast.map((c) => (
                  <li key={c.id}><strong>{c.name}</strong> <span>{c.character}</span></li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {similar.length > 0 && (
        <section>
          <h2 className="section-title">More like this</h2>
          <MovieGrid movies={similar} />
        </section>
      )}
    </article>
  );
}
