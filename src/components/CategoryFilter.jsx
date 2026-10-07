import { CATEGORIES } from "../api/tmdb.js";

export default function CategoryFilter({ category, genre, genres, onCategory, onGenre }) {
  return (
    <div className="filters">
      <div className="chips" role="group" aria-label="Movie lists">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`chip ${!genre && category === c.id ? "chip--active" : ""}`}
            aria-pressed={!genre && category === c.id}
            onClick={() => onCategory(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="select">
        <label htmlFor="genre">Genre</label>
        <select id="genre" value={genre} onChange={(e) => onGenre(e.target.value)}>
          <option value="">All genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
