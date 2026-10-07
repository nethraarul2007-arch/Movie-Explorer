import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getGenres, getMoviesByCategory, getMoviesByGenre, searchMovies } from "../api/tmdb.js";
import useFetch from "../hooks/useFetch.js";
import useDebounce from "../hooks/useDebounce.js";
import SearchBar from "../components/SearchBar.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import MovieGrid from "../components/MovieGrid.jsx";
import Pagination from "../components/Pagination.jsx";
import { GridSkeleton } from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

export default function Home() {
  // Filters live in the URL so the back button and shared links keep the same results.
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const category = params.get("category") || "popular";
  const genre = params.get("genre") || "";
  const page = Number(params.get("page")) || 1;

  const [input, setInput] = useState(query);
  const debouncedInput = useDebounce(input, 450);

  const update = (changes) => {
    const next = new URLSearchParams(params);
    Object.entries({ page: 1, ...changes }).forEach(([key, value]) => {
      if (value && value !== 1 && value !== "popular") next.set(key, value);
      else next.delete(key);
    });
    setParams(next);
  };

  useEffect(() => {
    const trimmed = debouncedInput.trim();
    if (trimmed !== query) update({ q: trimmed });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput]);

  const { data: genreData } = useFetch((signal) => getGenres(signal), []);

  const { data, loading, error, retry } = useFetch(
    (signal) => {
      if (query) return searchMovies(query, page, signal);
      if (genre) return getMoviesByGenre(genre, page, signal);
      return getMoviesByCategory(category, page, signal);
    },
    [query, category, genre, page]
  );

  const movies = data?.results || [];
  const heading = query
    ? `Results for “${query}”`
    : genre
    ? `${genreData?.genres?.find((g) => String(g.id) === genre)?.name || "Genre"} movies`
    : { popular: "Popular movies", top_rated: "Top rated movies", now_playing: "Now playing", upcoming: "Coming soon" }[category];

  return (
    <>
      <section className="intro">
        <h1>Find your next movie</h1>
        <SearchBar value={input} onChange={setInput} />
      </section>

      {!query && (
        <CategoryFilter
          category={category}
          genre={genre}
          genres={genreData?.genres || []}
          onCategory={(c) => update({ category: c, genre: "" })}
          onGenre={(g) => update({ genre: g })}
        />
      )}

      <h2 className="section-title">{heading}</h2>

      {loading && <GridSkeleton />}
      {error && <ErrorMessage message={error} onRetry={retry} />}
      {!loading && !error && movies.length === 0 && (
        <div className="notice">
          <p>No movies match “{query}”. Check the spelling or try a shorter title.</p>
        </div>
      )}
      {!loading && !error && movies.length > 0 && (
        <>
          <MovieGrid movies={movies} />
          <Pagination
            page={page}
            totalPages={data.total_pages}
            onChange={(p) => {
              update({ page: p, q: query, category, genre });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </>
      )}
    </>
  );
}
