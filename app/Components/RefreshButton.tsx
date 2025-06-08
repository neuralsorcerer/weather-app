"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGlobalContextUpdate } from "@/app/context/globalContext";
import { refreshIcon, spinnerIcon } from "@/app/utils/Icons";

export default function RefreshButton() {
  const { refreshData } = useGlobalContextUpdate();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await refreshData();
    setLoading(false);
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      size="icon"
      aria-label="Refresh weather data"
      disabled={loading}
    >
      {loading ? spinnerIcon : refreshIcon}
    </Button>
  );
}
