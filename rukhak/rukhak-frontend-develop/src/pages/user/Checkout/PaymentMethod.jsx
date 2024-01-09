import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";

function Payment() {
  return (
    <>
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
    </>
  );
}

export default Payment;
