import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";

import Box from "@mui/material/Box";

const BannerCarousel = ({ imgs }) => {
  return (
    <Box component="main">
      <Box sx={{ maxHeight: "400px", overflow: "hidden", marginTop: "1.5rem" }}>
        <Splide
          options={{
            pauseOnFocus: true,
            pauseOnHover: true,
            arrows: false,
            padding: "1rem",
            type: "loop",
            gap: "0.25rem",
            heightRatio: "0.7",
            autoplay: true,
            interval: 3000,
            pagination: false,
          }}
        >
          {imgs.map((img, index) => (
            <SplideSlide key={index}>
              <img src={img} alt="..." />
            </SplideSlide>
          ))}
        </Splide>
      </Box>
    </Box>
  );
};

export default BannerCarousel;
