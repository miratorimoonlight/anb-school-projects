import { useParams } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";

// MUI compnents
import Box from "@mui/material/Box";

// Internal components
import ProductCard from "./ProductCard";

const CardCarousel = ({ products }) => {
  const { productId } = useParams();

  const uniqueProducts = products
    ?.slice(0, 10)
    .filter((product) => product._id !== productId);

  return (
    <Splide
      options={{
        arrows: false,
        gap: "0.5rem",
        heightRatio: "0.9",
        autoplay: false,
        perPage: 2,
        pagination: false,
        height: "256px",
      }}
    >
      {uniqueProducts?.map((product) => (
        <SplideSlide key={product._id}>
          <Box sx={{ height: "100%", padding: "0.25rem 0" }}>
            <ProductCard product={product} />
          </Box>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default CardCarousel;
