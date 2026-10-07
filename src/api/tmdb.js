// All TMDB calls live here so components never build URLs themselves.
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const IMAGE_BASE = "https://image.tmdb.org/t/p";

export const CATEGORIES = [
  { id: "popular", label: "Popular" },
  { id: "top_rated", label: "Top rated" },
  { id: "now_playing", label: "Now playing" },
  { id: "upcoming", label: "Upcoming" },
];

async function request(path, params = {}, signal) {
  if (!API_KEY) {
    throw new Error(
      "Missing API key. Add VITE_TMDB_API_KEY to your .env file and restart the dev server."
    );
  }
  const query = new URLSearchParams({ api_key: API_KEY, language: "en-US", ...params });
  let res;
  try {
    res = await fetch(`${BASE_URL}${path}?${query}`, { signal });
  } catch (err) {
    if (err.name === "AbortError") throw err;
    throw new Error("Could not reach the movie service. Check your internet connection.");
  }
  if (res.status === 401) throw new Error("The API key was rejected. Check VITE_TMDB_API_KEY.");
  if (res.status === 404) throw new Error("We could not find that movie.");
  if (!res.ok) throw new Error(`The movie service returned an error (${res.status}). Try again.`);
  return res.json();
}

export const getMoviesByCategory = (category, page = 1, signal) =>
  request(`/movie/${category}`, { page }, signal);

export const searchMovies = (query, page = 1, signal) =>
  request("/search/movie", { query, page, include_adult: false }, signal);

export const getMoviesByGenre = (genreId, page = 1, signal) =>
  request("/discover/movie", { with_genres: genreId, page, sort_by: "popularity.desc" }, signal);

export const getGenres = (signal) => request("/genre/movie/list", {}, signal);

export const getMovieDetails = (id, signal) =>
  request(`/movie/${id}`, { append_to_response: "credits,videos,similar" }, signal);
