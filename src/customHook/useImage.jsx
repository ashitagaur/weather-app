// import { useState, useEffect } from "react";
import clearSkyImg from "../assets/clear_sky.png";
import fewCloudsImg from "../assets/few_clouds.png";
import brokenCloudsImg from "../assets/broken_clouds.png";
import overcastCloudsImg from "../assets/overcast_clouds.png";
import scatteredCloudsImg from "../assets/scattered_clouds.png";
import lightRainImg from "../assets/light_rain.png";

// Custom hook for fetching image based on description
function useImage(description) {
  // Object mapping description options to image URLs
  const descriptionImages = {
    "clear sky": clearSkyImg,
    "few clouds": fewCloudsImg,
    "broken clouds": brokenCloudsImg,
    "overcast clouds": overcastCloudsImg,
    "scattered clouds": scatteredCloudsImg,
    "light rain": lightRainImg,
  };

  // Get image URL based on description
  const imageUrl = descriptionImages[description.toLowerCase()];

  return imageUrl; // Default to city background if no matching description found
}

export default useImage;
