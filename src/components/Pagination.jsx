export default function Pagination({ page, totalPages, onChange }) {
  // TMDB only serves the first 500 pages.
  const last = Math.min(totalPages || 1, 500);
  if (last <= 1) return null;
  return (
    <nav className="pagination" aria-label="Pages">
      <button className="btn" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        Previous
      </button>
      <span>Page {page} of {last}</span>
      <button className="btn" disabled={page >= last} onClick={() => onChange(page + 1)}>
        Next
      </button>
    </nav>
  );
}
