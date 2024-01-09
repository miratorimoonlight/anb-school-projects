// Mui component
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Mui Icon
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

// Internal component
import BannerCarousel from "@/pages/Home/BannerCarousel";
import CategoriesSlider from "./CategoriesSlider";
import SectionHeader from "@/components/user/SectionHeader";
import CardCarousel from "@/components/user/CardCarousel";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CategoriesContext } from "@/contexts/user/CategoryContext";
import { useGetAllProductsQuery } from "@/features/api/getProductsSlice";
const imgs = [
  "https://hips.hearstapps.com/hmg-prod/images/plants-1620425290.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*",
  "https://advanceplants.com.au/wp-content/uploads/2020/06/Corporate-Indoor-Plant-Hire-7.jpg",
  "https://www.ikea.com/images/an-white-office-space-filled-with-large-grean-floor-plants-03228b07a2eb6c2b3d3df4749d525c25.jpg?f=s",
];

function HomePage() {
  const navigate = useNavigate();
  const { categoryData, handleClick } = useContext(CategoriesContext);
  const { data: hotProducts } = useGetAllProductsQuery({ query: "hot" });
  useEffect(() => {
    categoryData.map((data) => (data.selected = false));
  }, [categoryData]);

  return (
    <Box component="main" sx={{ minHeight: "100vh" }}>
      <BannerCarousel imgs={imgs} />
      <CategoriesSlider categories={categoryData} />
      <Box sx={{ padding: "0 1rem" }}>
        <Button
          sx={{
            borderRadius: "0.5rem",
            display: "flex",
            flexDirection: "column",
            color: "background.default",
            padding: "1rem",
            ":hover": { backgroundColor: "#035316" },
            // eslint-disable-next-line no-dupe-keys
            background:
              "linear-gradient(225deg, rgba(169,245,164,1) 0%, rgba(3,83,22,1) 100%)",
            marginBottom: "1rem",
          }}
          variant="contained"
          fullWidth
          onClick={() => {
            navigate("/store");
            handleClick((categoryData[0].selected = true));
          }}
        >
          <ShoppingBagIcon sx={{ fontSize: "6rem" }} />
          <Typography variant="body" sx={{ fontSize: "1rem" }}>
            go to store
          </Typography>
        </Button>
        <Box>
          <div
            onClick={() => {
              handleClick((categoryData[2].selected = true));
            }}
          >
            <SectionHeader title="Hot Product" link="/store" />
          </div>
          {hotProducts && <CardCarousel products={hotProducts?.data} />}
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
