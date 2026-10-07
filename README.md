# Movie Explorer

A React app to search and browse movies, view details and ratings, filter by category and genre, and save favourites. Movie data comes from the [TMDB API](https://www.themoviedb.org/documentation/api).

## Features
- Search movies (debounced, cancels outdated requests)
- Movie details: overview, rating, cast, director, trailer link, similar movies
- Ratings shown as a score out of 10 with a bar
- Category filters (Popular, Top rated, Now playing, Upcoming) and genre filter
- Pagination, and filters stored in the URL so links and the back button work
- Saved movies (React Context + localStorage)
- Loading skeletons, error messages with retry, empty states
- Responsive layout, keyboard focus styles, reduced-motion support

## Tech
React 18, React Router 6, Vite. Hooks used: `useState`, `useEffect`, `useReducer`, `useContext`, `useMemo`, `useCallback`, plus custom hooks `useFetch`, `useDebounce`, `useLocalStorage`.

## Run locally
```bash
npm install
cp .env.example .env     # then paste your free TMDB v3 API key into .env
npm run dev
```

## Deploy (Vercel or Netlify)
1. Push this repo to GitHub.
2. Import the repo in Vercel or Netlify. Build command: `npm run build`, output directory: `dist`.
3. Add the environment variable `VITE_TMDB_API_KEY` in the host's settings.
4. Deploy. `vercel.json` and `public/_redirects` already handle client-side routing.

## Project structure
```
src/
  api/tmdb.js          all API calls and error messages
  hooks/               useFetch, useDebounce, useLocalStorage
  context/             FavoritesContext (global state)
  components/          Navbar, SearchBar, CategoryFilter, MovieCard, MovieGrid, Rating, Pagination, Loader, ErrorMessage, FavoriteButton
  pages/               Home, MovieDetails, Favorites, NotFound
```

## AI-assisted activity (fill in with your own notes)
- **Generated with AI:** list the components you first drafted with an AI tool and the prompts you used.
- **Refactored for reusability:** e.g. repeated fetch logic became `useFetch`; card markup became `MovieCard` and `MovieGrid`; the heart/save logic became `FavoriteButton`.
- **State troubleshooting with AI:** e.g. stale results when typing fast, fixed with `AbortController` and `useDebounce`; keeping filters in the URL instead of local state.
