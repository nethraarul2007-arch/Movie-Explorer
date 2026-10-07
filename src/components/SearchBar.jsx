export default function SearchBar({ value, onChange }) {
  return (
    <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search" className="sr-only">Search movies</label>
      <input
        id="search"
        type="search"
        placeholder="Search for a movie title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
      {value && (
        <button type="button" className="btn btn--ghost" onClick={() => onChange("")}>
          Clear
        </button>
      )}
    </form>
  );
}
