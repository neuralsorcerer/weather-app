"use client";
import { useGlobalContextUpdate } from "@/app/context/globalContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { locationIcon, spinnerIcon } from "@/app/utils/Icons";

export default function CurrentLocationButton() {
  const { setActiveCityCoords } = useGlobalContextUpdate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLoading(false);
        setError("");
        const { latitude, longitude } = pos.coords;
        setActiveCityCoords([latitude, longitude]);
      },
      () => {
        setLoading(false);
        setError("Unable to access location");
      }
    );
  };

  return (
    <div className="flex flex-col items-start">
      <Button
        onClick={handleClick}
        variant="secondary"
        size="sm"
        className="flex items-center gap-2"
        disabled={loading}
      >
        {loading ? spinnerIcon : locationIcon}
        <span className="hidden sm:inline">Current Location</span>
      </Button>
      {error && (
        <p className="text-xs text-red-500 mt-1 whitespace-nowrap">{error}</p>
      )}
    </div>
  );
}
