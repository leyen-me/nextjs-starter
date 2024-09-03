import { Card, CardContent, CardHeader } from "@mui/material";
import { useI18n } from "./I18nProvider";

type BaseCardProps = {
  title?: string;
  children: React.ReactNode;
};

export function BaseCard({ title, children }: BaseCardProps) {
  return (
    <Card sx={{ marginBottom: 2, padding: 2 }}>
      {title && <CardHeader title={title} />}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
