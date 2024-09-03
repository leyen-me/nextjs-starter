import { PropsWithChildren } from "react";
import { useTheme } from "../ThemeProvider";

export const Main = ({ children }: PropsWithChildren<unknown>) => {
  const { theme } = useTheme();
  return (
    <main
      className="h-full flex-1 overflow-auto p-4"
      style={{ backgroundColor: theme.palette.background.paper }}
    >
      {children}
    </main>
  );
};
