// TMDB scores are out of 10. The bar gives a quick visual; the text is the accessible value.
export default function Rating({ value = 0, votes, size = "sm" }) {
  const score = Number(value) || 0;
  const hasScore = score > 0;
  return (
    <div
      className={`rating rating--${size}`}
      aria-label={hasScore ? `Rated ${score.toFixed(1)} out of 10` : "Not rated yet"}
    >
      <span className="rating__score">{hasScore ? score.toFixed(1) : "NR"}</span>
      <span className="rating__bar" aria-hidden="true">
        <span style={{ width: `${score * 10}%` }} />
      </span>
      {votes > 0 && size === "lg" && <span className="rating__votes">{votes.toLocaleString()} votes</span>}
    </div>
  );
}
