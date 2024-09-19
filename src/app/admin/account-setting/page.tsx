"use client";

import { useI18n } from "@/components/I18nProvider";
import { useUserStore } from "@/stores/userStore";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  styled,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import api from "@/utils/request";
import { useToast } from "@/components/ToastProvider";
import { I18nError } from "@/utils/error";
import { Image } from "@prisma/client";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 4 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function AccountSettingPage() {
  const [value, setValue] = useState(0);
  const { t } = useI18n();
  const { showSuccess, showError } = useToast();
  const userStore = useUserStore();
  const user = userStore.getUser();
  const tabs = [
    {
      label: t("pages.accountSetting.account.label"),
      content: "Account",
    },
    {
      label: t("pages.accountSetting.password.label"),
      content: "Password",
    },
  ];

  const handleUpload = async (event: React.SyntheticEvent) => {
    const { files } = event.target as HTMLInputElement;
    const file = files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await api.post<Image>("/api/image", formData);
      showSuccess(res);
      userStore.updateAvatar("/api/image/" + res.data);
    } catch (error: any) {
      showError(error);
    } finally {
      // 清空文件
      (document.getElementById("upload-avatar") as HTMLInputElement).value = "";
    }
  };

  const handleReset = () => {
    userStore.resetAvatar();
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 2 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={t(tab.label)} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ height: "400px" }}>
            <Card sx={{ padding: 2, height: "100%" }}>
              <CardContent>
                <Typography variant="h6">
                  {t("pages.accountSetting.account.profile.title")}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: 14, color: "text.secondary", opacity: 0.6 }}
                >
                  {t("pages.accountSetting.account.profile.description")}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 4,
                    marginBottom: 4,
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={user.avatar ?? ""}
                    sx={{ width: 120, height: 120 }}
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    color="primary"
                    tabIndex={-1}
                  >
                    {t("pages.common.upload")}
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleUpload}
                      id="upload-avatar"
                    />
                  </Button>

                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleReset}
                  >
                    {t("pages.common.reset")}
                  </Button>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: 4,
                    textAlign: "center",
                    fontSize: 12,
                    color: "text.secondary",
                    opacity: 0.6,
                  }}
                >
                  {t("pages.accountSetting.account.profile.tip")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ padding: 2 }}>
              <CardContent></CardContent>
            </Card>
          </Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}></CustomTabPanel>
    </>
  );
}
