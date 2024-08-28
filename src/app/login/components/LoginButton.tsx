import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const LoginButton = styled(Button)(({ theme }) => ({
  color: "#000",
  backgroundColor: "transparent", // Transparent background
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)", // Slight darkening on hover for visual feedback
  },
  borderColor: "#d3d3d3", // Light gray border
}));