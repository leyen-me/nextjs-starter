import { PropsWithChildren } from "react";
import { useTheme } from "../ThemeProvider";

export const Main = ({ children }: PropsWithChildren<unknown>) => {
  const { theme } = useTheme();
  return (
    <main
      className="h-full flex-1 overflow-auto p-4"
      style={{ backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#f0f0f0" }}
    >
      {children}
    </main>
  );
};
