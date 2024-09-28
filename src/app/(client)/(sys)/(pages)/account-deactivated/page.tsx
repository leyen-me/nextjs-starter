"use client";

import { useI18n } from "@/components/I18nProvider";
import { Logo } from "@/components/Logo";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function AccountDeactivated() {
  const router = useRouter();
  const { t } = useI18n();

  return <Box className="flex flex-col items-center justify-center h-screen">
    <Logo mode="square" />
    <Box className="flex flex-col items-center justify-center" sx={{ marginTop: 4 }}>
      <Typography variant="h4" sx={{ textAlign: "center" }}>{t("pages.accountDeactivated.title")}</Typography>
      <Typography variant="body1" sx={{ textAlign: "center" }}> {t("pages.accountDeactivated.description")} </Typography>
      <Button sx={{ marginTop: 2 }} variant="outlined" color="primary" onClick={() => {
        router.push("/");
      }} style={{ borderRadius: '50px' }}>
        {t("pages.accountDeactivated.button.back")}
      </Button>
    </Box>
  </Box>;
}
