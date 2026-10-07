import { useEffect, useReducer } from "react";

// One reducer keeps loading / data / error in sync, so we never show a stale combination.
function reducer(state, action) {
  switch (action.type) {
    case "start":
      return { ...state, loading: true, error: null };
    case "success":
      return { data: action.data, loading: false, error: null };
    case "error":
      return { data: null, loading: false, error: action.error };
    default:
      return state;
  }
}

// fetcher receives an AbortSignal. Pass a stable `deps` array describing what the request depends on.
export default function useFetch(fetcher, deps) {
  const [state, dispatch] = useReducer(reducer, { data: null, loading: true, error: null });
  const [retryCount, retry] = useReducer((n) => n + 1, 0);

  useEffect(() => {
    const controller = new AbortController();
    dispatch({ type: "start" });
    fetcher(controller.signal)
      .then((data) => dispatch({ type: "success", data }))
      .catch((err) => {
        if (err.name !== "AbortError") dispatch({ type: "error", error: err.message });
      });
    // Cancel the request if inputs change or the component unmounts (prevents race conditions).
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, retryCount]);

  return { ...state, retry };
}
