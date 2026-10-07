import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notice">
      <h1>Page not found</h1>
      <p>That address does not match anything in Movie Explorer.</p>
      <Link className="btn" to="/">Back to browse</Link>
    </div>
  );
}
