"use client";

import HeroSection from "../_components/_home/HeroSection";
import Recipes from "../_components/_home/Recipes";
import Products from "../_components/_home/Products";
import DetectedDeals from "../_components/_home/DetectedDeals";
import Cookies from "js-cookie";

function page() {
  const token = Cookies.get("token");
  return (
    <div className="max-w-7xl mx-4 lg:mx-auto">
      <HeroSection />
      {token ? <Recipes /> : null}

      {/* <Products /> */}
      <DetectedDeals />
    </div>
  );
}

export default page;
