import { useState,useEffect } from "react";
export const useLocation = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [errorLocation, setErrorLocation] = useState<string | null>(null);

  useEffect(() => {
    const getLocation=()=>{
    if (!navigator.geolocation) {
      setErrorLocation("Geolocation is not supported by your browser");
      return;
    }

    const timeout = setTimeout(() => {
      setErrorLocation("Location request timed out, please refresh"); // unblocks the UI
    }, 10000); // 10 seconds

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(timeout); // cancel timeout if success
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        clearTimeout(timeout); // cancel timeout if error
        setErrorLocation(error.message);
      },
      {
        timeout: 10000,
        maximumAge: 60000, // reuse cached position up to 1 min old
        enableHighAccuracy: false,
      }
    );
    }
    getLocation()
  }, []);

  return { location, errorLocation };
};