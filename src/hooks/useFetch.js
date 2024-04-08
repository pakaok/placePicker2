import { useEffect, useState } from "react";
export function useFetch(fetchFn,initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (err) {
        setError(err.message || "Failed to load user places...");
      }
      setIsFetching(false);
    }
    fetchPlaces();
  }, []);
  return { isFetching, fetchedData, error, setFetchedData };
}
