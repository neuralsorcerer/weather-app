"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { rain } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Precipitation() {
  const { fiveDayForecast } = useGlobalContext();

  const list = fiveDayForecast?.list;

  if (!list || list.length === 0) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const nextDay = list.slice(0, 8);
  const maxPop = Math.max(...nextDay.map((entry: any) => entry.pop ?? 0));
  const percentage = Math.round(maxPop * 100);

  const description = (() => {
    if (percentage < 20) return "Low chance of rain in the next 24 hours";
    if (percentage < 30) return "Slight chance of rain in the next 24 hours";
    if (percentage < 50) return "Moderate chance of rain in the next 24 hours";
    return "High chance of rain in the next 24 hours";
  })();

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {rain} Precipitation
        </h2>
        <p className="pt-4 text-2xl">{percentage}%</p>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
}
