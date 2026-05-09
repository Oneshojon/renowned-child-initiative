// A reusable hook for fetching any Sanity query
// Usage: const { data, loading, error } = useSanity(SERVICES_QUERY);

import { useState, useEffect } from "react";
import { client } from "../lib/sanity";

export function useSanity(query, params = {}) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    // Don't fetch if no query was passed
    if (!query) {
      setLoading(false);
      return;
    }

    let cancelled = false; // prevents setting state on unmounted components

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const result = await client.fetch(query, params);

        // Only update state if component is still mounted
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to fetch data from Sanity");
          console.error("Sanity fetch error:", err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    // Cleanup — runs if component unmounts before fetch finishes
    return () => { cancelled = true; };

  }, [query]); // re-runs if the query changes

  return { data, loading, error };
}

// ── How to use this in any page component ────────────────────────
//
// import { useSanity }       from "../hooks/useSanity";
// import { SERVICES_QUERY }  from "../lib/queries";
//
// export default function Services() {
//   const { data, loading, error } = useSanity(SERVICES_QUERY);
//
//   if (loading) return <p>Loading...</p>;
//   if (error)   return <p>Something went wrong.</p>;
//
//   return (
//     <ul>
//       {data.map(service => (
//         <li key={service._id}>{service.title}</li>
//       ))}
//     </ul>
//   );
// }