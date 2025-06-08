"use client";
import React from "react";
import ThemeDropdown from "./ThemeDropdown/ThemeDropdown";
import SearchDialog from "./SearchDialog/SearchDialog";
import CurrentLocationButton from "./CurrentLocationButton";

function Navbar() {
  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="left flex items-center gap-2">
        <CurrentLocationButton />
      </div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />

        <div className="btn-group flex items-center gap-2">
          <ThemeDropdown />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
