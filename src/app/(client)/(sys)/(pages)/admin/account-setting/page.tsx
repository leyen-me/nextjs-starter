"use client";

import { useI18n } from "@/components/I18nProvider";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  styled,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import api from "@/utils/request";
import { useToast } from "@/components/ToastProvider";
import { I18nError } from "@/utils/error";
import { SysUserGender, SysImage, SysUser } from "@prisma/client";
import { DICT_KEYS } from "@/contants";
import { useRouter } from "next/navigation";
import { BaseDictSelect } from "@/components/BaseDictSelect";
import { validateEmail } from "@/utils/validate";
import { useUserStore } from "@/app/(client)/(sys)/stores/userStore";
import { SYS_IMAGE_MIME_TYPE, SYS_IMAGE_MAX_SIZE } from "@/app/(client)/(sys)/constans";
import { signOut } from "next-auth/react";


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
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function CustomCardHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <Typography variant="h6">{title}</Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: 14, color: "text.secondary", opacity: 0.6 }}
      >
        {description}
      </Typography>
    </>
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

export type SysDetailUser = Omit<
  SysUser,
  "id" | "createdAt" | "superAdmin" | "status" | "password" | "avatar"
>;

export default function AccountSettingPage() {
  const profileHeight = "400px";
  const { t } = useI18n();
  const { showSuccess, showError } = useToast();
  const router = useRouter();

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

  const [value, setValue] = useState(0);
  const userStore = useUserStore();
  const user = userStore.getUser();

  const handleUpload = async (event: React.SyntheticEvent) => {
    const { files } = event.target as HTMLInputElement;
    const file = files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      // 校验文件类型
      if (!Object.values(SYS_IMAGE_MIME_TYPE).includes(file.type)) {
        throw new I18nError("server.image.upload.mimeType.invalid");
      }
      // 校验文件大小
      if (file.size > SYS_IMAGE_MAX_SIZE) {
        throw new I18nError("server.image.upload.size.invalid");
      }
      const res = await api.post<SysImage>("/api/image", formData);
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

  const [passwordState, setPasswordState] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<any>({});

  const handlePasswordValidate = () => {
    let tempErrors: any = {};

    tempErrors.password = passwordState.password
      ? ""
      : t("pages.admin.user.error.password.required");

    if (passwordState.password !== passwordState.confirmPassword) {
      tempErrors.confirmPassword = t("pages.register.passwordMismatch");
    }

    setPasswordErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handlePasswordSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (handlePasswordValidate()) {
      try {
        const res = await userStore.updatePassword(passwordState.password);
        showSuccess(res);
        // 重新登录
        signOut();
      } catch (error: any) {
        showError(error);
      }
    }
  };

  const handlePasswordChange = (event: React.SyntheticEvent) => {
    const { value, name } = event.target as HTMLInputElement;
    setPasswordState({ ...passwordState, [name]: value });
  };

  const [detailState, setDetailState] = useState<SysDetailUser>({
    nickname: user.nickname || "",
    email: user.email || "",
    mobile: user.mobile || "",
    gender: user.gender || SysUserGender.MALE,
  });
  const [detailErrors, setDetailErrors] = useState<any>({});

  const handleDetailChange = (event: React.SyntheticEvent) => {
    const { value, name } = event.target as HTMLInputElement;
    setDetailState({ ...detailState, [name]: value });
  };

  const handleDetailValidate = () => {
    let tempErrors: any = {};

    tempErrors.nickname = detailState.nickname
      ? ""
      : t("pages.admin.user.error.nickname.required");

    tempErrors.email = detailState.email
      ? validateEmail(detailState.email)
        ? ""
        : t("pages.admin.user.error.email.format")
      : t("pages.admin.user.error.email.required");

    tempErrors.mobile = detailState.mobile
      ? ""
      : t("pages.admin.user.error.mobile.required");

    setDetailErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleDetailSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (handleDetailValidate()) {
      try {
        const res = await userStore.updateUserInfo(detailState);
        showSuccess(res);
      } catch (error: any) {
        showError(error);
      }
    }
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
          <Grid size={{ xs: 12, md: 6 }} sx={{ height: profileHeight }}>
            <Card sx={{ padding: 2, height: "100%" }}>
              <CardContent>
                <CustomCardHeader
                  title={t("pages.accountSetting.account.profile.title")}
                  description={t(
                    "pages.accountSetting.account.profile.description"
                  )}
                />
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
                    sx={{
                      width: 120,
                      height: 120,
                      border: "0.5px solid rgba(0, 0, 0, 0.1)",
                    }}
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
          <Grid size={{ xs: 12, md: 6 }} sx={{ height: profileHeight }}>
            <Card sx={{ padding: 2, height: "100%" }}>
              <CardContent>
                <CustomCardHeader
                  title={t("pages.accountSetting.account.password.title")}
                  description={t(
                    "pages.accountSetting.account.password.description"
                  )}
                />
                <Box
                  component="form"
                  onSubmit={handlePasswordSubmit}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    marginTop: 8,
                  }}
                >
                  <TextField
                    label={t("pages.register.password")}
                    name="password"
                    type="password"
                    value={passwordState.password || ""}
                    onChange={handlePasswordChange}
                    variant="outlined"
                    error={!!passwordErrors.password}
                    helperText={passwordErrors.password}
                    fullWidth
                  />
                  <TextField
                    label={t("pages.register.confirmPassword")}
                    name="confirmPassword"
                    type="password"
                    value={passwordState.confirmPassword || ""}
                    onChange={handlePasswordChange}
                    error={!!passwordErrors.confirmPassword}
                    helperText={passwordErrors.confirmPassword}
                    fullWidth
                  />
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", gap: 4 }}
                  >
                    <Button variant="contained" color="primary" type="submit">
                      {t("pages.common.update")}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 24, md: 24 }}>
            <Card sx={{ padding: 2, height: "100%" }}>
              <CardContent>
                <CustomCardHeader
                  title={t("pages.accountSetting.account.detail.title")}
                  description={t(
                    "pages.accountSetting.account.detail.description"
                  )}
                />
                <Box
                  component="form"
                  onSubmit={handleDetailSubmit}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 4,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label={t("pages.admin.user.nickname")}
                        name="nickname"
                        type="nickname"
                        value={detailState.nickname || ""}
                        onChange={handleDetailChange}
                        variant="outlined"
                        error={!!detailErrors.nickname}
                        helperText={detailErrors.nickname}
                        fullWidth
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label={t("pages.admin.user.email")}
                        name="email"
                        type="email"
                        value={detailState.email || ""}
                        onChange={handleDetailChange}
                        error={!!detailErrors.email}
                        helperText={detailErrors.email}
                        fullWidth
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        label={t("pages.admin.user.mobile")}
                        name="mobile"
                        type="text"
                        value={detailState.mobile || ""}
                        onChange={handleDetailChange}
                        error={!!detailErrors.mobile}
                        helperText={detailErrors.mobile}
                        fullWidth
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <BaseDictSelect
                        label={t("pages.admin.user.gender")}
                        name="gender"
                        size="medium"
                        allowAll={false}
                        value={detailState.gender || ""}
                        error={!!detailErrors.gender}
                        helperText={detailErrors.gender}
                        onChange={handleDetailChange as any}
                        dictKey={DICT_KEYS.SysUserGender}
                      />
                    </Grid>
                  </Grid>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 2,
                      marginTop: 4,
                    }}
                  >
                    <Button variant="contained" color="primary" type="submit">
                      {t("pages.common.update")}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}></CustomTabPanel>
    </>
  );
}
