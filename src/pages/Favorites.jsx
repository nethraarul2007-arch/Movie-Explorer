import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";
import MovieGrid from "../components/MovieGrid.jsx";

export default function Favorites() {
  const { favorites } = useFavorites();
  return (
    <>
      <h1 className="section-title">Saved movies</h1>
      {favorites.length === 0 ? (
        <div className="notice">
          <p>You have not saved any movies yet. Press Save on a movie to keep it here.</p>
          <Link className="btn" to="/">Browse movies</Link>
        </div>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </>
  );
}
