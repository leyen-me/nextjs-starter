import { Card, CardContent, CardHeader } from "@mui/material";

type BaseCardProps = {
  title?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
};

export function BaseCard({ title, children, action }: BaseCardProps) {
  return (
    <Card sx={{ marginBottom: 2, padding: 2 }}>
      {title && (
        <CardHeader
          title={title}
          titleTypographyProps={{ variant: "h6" }}
          action={action}
        />
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
