"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { droplet } from "@/app/utils/Icons";
import { kelvinToCelsius, kelvinToFahrenheit } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function calcDewPoint(tempK: number, humidity: number): number {
  const tempC = kelvinToCelsius(tempK);
  const a = 17.27;
  const b = 237.7;
  const alpha = (a * tempC) / (b + tempC) + Math.log(humidity / 100);
  return (b * alpha) / (a - alpha);
}

export default function DewPoint() {
  const { forecast, unit } = useGlobalContext();
  const tempK = forecast?.main?.temp;
  const humidity = forecast?.main?.humidity;

  if (tempK === undefined || humidity === undefined) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const dewPointC = calcDewPoint(tempK, humidity);
  const dewPoint =
    unit === "f"
      ? kelvinToFahrenheit(dewPointC + 273.15)
      : Math.round(dewPointC);

  const description = (() => {
    if (dewPoint <= 10) return "Dry and comfortable";
    if (dewPoint <= 16) return "Pleasant conditions";
    if (dewPoint <= 20) return "A bit humid";
    if (dewPoint <= 24) return "Humid";
    return "Very humid";
  })();

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {droplet} Dew Point
        </h2>
        <p className="pt-4 text-2xl">
          {dewPoint}°{unit.toUpperCase()}
        </p>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
}
