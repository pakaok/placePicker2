import { useState } from "react";
import Places from "./Places.jsx";
import { useEffect } from "react";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    const fetchData = async ()=> {
      const response = await fetch("http://localhost:3000/places")
      const resData = await response.json()
      setAvailablePlaces(resData.places)
    }
    fetchData()
  }, []);
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
