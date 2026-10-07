export default function Loader({ label = "Loading" }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__reel" aria-hidden="true" />
      <span>{label}…</span>
    </div>
  );
}

// Placeholder cards keep the layout steady while a grid loads.
export function GridSkeleton({ count = 12 }) {
  return (
    <div className="grid" aria-busy="true" aria-label="Loading movies">
      {Array.from({ length: count }, (_, i) => (
        <div className="card card--skeleton" key={i} />
      ))}
    </div>
  );
}
