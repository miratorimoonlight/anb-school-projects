import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SecondaryTopNavigationBar from "@/components/user/SecondaryTopNavigationBar";
import { CartContext } from "@/contexts/user/CartContext";
import CartBottomBar from "@/components/user/CartBottomBar";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import Typography from "@mui/material/Typography";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import useUser from "@/hooks/user/useUser";

function Checkout() {
  const { buyNowItems } = useContext(CartContext);
  const { curAddress } = useUser();

  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [open, setOpen] = useState(false);

  const overallItem = buyNowItems.length;

  const navToCheckout = () => {
    if (!paymentMethod) {
      setOpen(true);
    } else if (paymentMethod === "credit card") {
      navigate("/paypal");
    } else if (paymentMethod === "cash on delivery")
      navigate("/order-is-confirmed");
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    localStorage.setItem("buyNow", JSON.stringify(buyNowItems));
  }, [buyNowItems]);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <SecondaryTopNavigationBar returnPrevLink={-1} label="Checkout" />
      <Grid container spacing={3} padding={2}>
        <Grid item xs={12}>
          <Card sx={{ padding: "0.5rem" }} elevation={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box gap={1} sx={{ display: "flex" }}>
                <Box>
                  <PlaceOutlinedIcon />
                </Box>
                <Box variant="h5"> Delivery Address</Box>
              </Box>
              <Button sx={{ color: "text.primary" }}>
                <ModeEditOutlineOutlinedIcon />
              </Button>
            </Box>
            <Box>
              <Box
                sx={{ display: "flex", alignItems: "center", padding: "0 8px" }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image="https://css-tianguis.com/wp-content/uploads/2020/03/google-maps-links-1024x546.png"
                  alt="map"
                  sx={{ width: 56, height: 56, borderRadius: 1 }}
                />
                <CardContent
                  sx={{ padding: "0 !important", marginLeft: "1rem" }}
                >
                  <Typography gutterBottom variant="body1">
                    {curAddress?.fullname}
                  </Typography>
                  <Typography>{curAddress?.phoneNumber}</Typography>
                </CardContent>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} padding={2}>
        <Grid item xs={12}>
          <Card sx={{ padding: "0.5rem" }}>
            <Box gap={1} sx={{ display: "flex" }}>
              <Box>
                <AccountBalanceWalletOutlinedIcon />
              </Box>
              <Box>Payment Method</Box>
            </Box>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="credit card"
                  control={<Radio size="small" />}
                  label="Credit Card"
                />
                <FormControlLabel
                  value="cash on delivery"
                  control={<Radio size="small" />}
                  label="Cash on Delivery"
                />
              </RadioGroup>
            </FormControl>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} padding={2}>
        <Grid item xs={12}>
          <Card sx={{ padding: "0.5rem" }}>
            <Box gap={1} sx={{ display: "flex" }}>
              <Box>
                <SellOutlinedIcon />
              </Box>
              <Box sx={{ color: "text.primary" }}>
                {overallItem === 1 ? "Item List" : "Items List"}
              </Box>
            </Box>
            {buyNowItems.map((buyNowItem) => (
              <Box
                key={buyNowItem.id}
                sx={{
                  display: "flex",
                  marginTop: "0.5rem",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography>{buyNowItem.title}</Typography>
                </Box>
                <Box gap={1} sx={{ display: "flex" }}>
                  <Box gap={1} sx={{ display: "flex" }}>
                    <Typography>{buyNowItem.quantity}</Typography>
                    <Typography>x</Typography>
                  </Box>
                  <Box>$ {buyNowItem.price}</Box>
                </Box>
              </Box>
            ))}
          </Card>
        </Grid>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Warning</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please select the method of payment.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>OK</Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <Box>
        <CartBottomBar
          totalPrice={buyNowItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
          buttonText="Place Order"
          onClick={navToCheckout}
        />
      </Box>
    </Box>
  );
}

export default Checkout;
