import { useState } from "react";
import Places from "./Places.jsx";
import { useEffect } from "react";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import { useFetch } from "../hooks/useFetch.js";

async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );
      resolve(sortedPlaces);
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    isFetching,
    fetchedData: availablePlaces,
    error,
  } = useFetch(fetchSortedPlaces, []);

  if (error) {
    return <Error title="Error occured" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
      isLoading={isFetching}
      loadingText="Fetching Data...."
    />
  );
}
