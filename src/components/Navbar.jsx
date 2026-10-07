import { NavLink, Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function Navbar() {
  const { favorites } = useFavorites();
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="brand">Movie Explorer</Link>
        <nav aria-label="Main">
          <NavLink to="/" end>Browse</NavLink>
          <NavLink to="/favorites">
            Saved <span className="count">{favorites.length}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
