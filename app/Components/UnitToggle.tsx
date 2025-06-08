"use client";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/app/context/globalContext";
import { Button } from "@/components/ui/button";

export default function UnitToggle() {
  const { unit } = useGlobalContext();
  const { setUnit } = useGlobalContextUpdate();

  const toggle = () => {
    setUnit(unit === "c" ? "f" : "c");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggle}
      aria-label="Toggle temperature unit"
    >
      {unit === "c" ? "°C" : "°F"}
    </Button>
  );
}
