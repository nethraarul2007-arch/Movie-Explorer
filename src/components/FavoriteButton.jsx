import { useFavorites } from "../context/FavoritesContext.jsx";

export default function FavoriteButton({ movie, className = "" }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(movie.id);
  return (
    <button
      type="button"
      className={`fav ${saved ? "fav--on" : ""} ${className}`}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${movie.title} from saved` : `Save ${movie.title}`}
      onClick={() => toggleFavorite(movie)}
    >
      {saved ? "Saved" : "Save"}
    </button>
  );
}
