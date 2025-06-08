"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { cloud } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function CloudCover() {
  const { forecast } = useGlobalContext();

  const cloudiness = forecast?.clouds?.all;

  if (cloudiness === undefined) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const description = (() => {
    if (cloudiness < 20) return "Mostly clear skies";
    if (cloudiness < 50) return "Partly cloudy";
    if (cloudiness < 80) return "Mostly cloudy";
    return "Overcast conditions";
  })();

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {cloud} Cloud Cover
        </h2>
        <p className="pt-4 text-2xl">{cloudiness}%</p>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
}
