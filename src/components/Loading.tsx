import { Box } from "@mui/material";
import { useTheme } from "./ThemeProvider";

export default function Loading() {
  const { theme } = useTheme();
  return (
    <Box
      className="flex justify-center items-center h-screen"
      sx={{
        "--loading-element-color-1": theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <span className="loader"></span>
    </Box>
  );
}
