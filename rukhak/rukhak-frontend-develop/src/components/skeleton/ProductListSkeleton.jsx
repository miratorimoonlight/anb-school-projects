import Box from "@mui/material/Box";
import CardSkeleton from "./CardSkeleton";
import Stack from "@mui/material/Stack";

function ProductListSkeleton({ numberOfCards }) {
  const cardArray = Array.from({ length: numberOfCards }, (_, index) => (
    <CardSkeleton key={index} />
  ));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          boxShadow: "none",
          p: "1rem",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: "0.5rem",
            overflow: "hidden",
          }}
        >
          {cardArray}
        </Stack>
      </Box>
    </>
  );
}

export default ProductListSkeleton;
