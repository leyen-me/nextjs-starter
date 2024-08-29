"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { LoginButton } from "./components/LoginButton";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";

import { useToast } from "@/components/ToastProvider";
import { getPassword, savePassword } from "@/utils";
import AuthBg from "@/components/auth/AuthBg";
import { useI18n } from "@/components/I18nProvider";
import IconGoogle from "@/components/icons/IconGoogle";
import IconGithub from "@/components/icons/IconGithub";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email") || "";
    setEmail(email);

    const rememberPassword =
      localStorage.getItem("rememberPassword") === "true";
    setRememberPassword(rememberPassword);

    const password = getPassword() || "";
    setPassword(password);
  }, []);

  const { t } = useI18n();
  const { showToast } = useToast();

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl,
      redirect: false,
    });
    if (result?.error) {
      setLoading(false);
      showToast(t("pages.login.invalidCredentials"), "error");
      return;
    }
    setLoading(false);

    // 记住账号
    localStorage.setItem("email", email);
    // 记住密码
    if (rememberPassword) {
      savePassword(password);
      localStorage.setItem("rememberPassword", "true");
    } else {
      localStorage.removeItem("password");
      localStorage.removeItem("rememberPassword");
    }
    router.push(callbackUrl);
  };

  const handleGithubLogin = async () => {
    const result = await signIn("github", { callbackUrl, redirect: false });
    if (result?.error) {
      showToast(t("pages.login.githubError"), "error");
      return;
    }
    router.push(callbackUrl);
  };

  const handleGoogleLogin = async () => {
    const result = await signIn("google", { callbackUrl, redirect: false });
    if (result?.error) {
      showToast(t("pages.login.googleError"), "error");
      return;
    }
    router.push(callbackUrl);
  };

  return (
    <div className="flex flex-col h-full justify-between xl:flex-row">
      {/* left or top */}
      <AuthBg />
      {/* right or bottom */}
      <div className="w-full xl:w-1/3 p-6 h-full flex flex-col justify-center ">
        <div className="mx-auto w-full max-w-[400px]">
          <h1 className="mx-0 mb-1 text-2xl font-bold">
            {t("pages.login.welcome")}
          </h1>
          <p className="mx-0 mb-8 text-sm text-gray-500">
            {t("pages.login.description")}
          </p>
          <div className="w-full flex justify-center ">
            <ul className="w-full flex gap-2">
              <li className="flex-1">
                <Button
                  variant="outlined"
                  className="w-full h-11"
                  onClick={handleGoogleLogin}
                  color="info"
                >
                  <div className="flex items-center gap-2">
                    <IconGoogle />
                    <span>Google</span>
                  </div>
                </Button>
              </li>
              <li className="flex-1">
                <Button
                  className="w-full h-11"
                  variant="outlined"
                  onClick={handleGithubLogin}
                >
                  <div className="flex items-center gap-2">
                    <IconGithub />
                    <span>GitHub</span>
                  </div>
                </Button>
              </li>
            </ul>
          </div>
          <div className="my-8">
            <Divider>
              <Typography variant="body2" color="textSecondary">
                {t("pages.login.signwith")}
              </Typography>
            </Divider>
          </div>
          <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
            <TextField
              fullWidth
              label={t("pages.login.email")}
              variant="outlined"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                {t("pages.login.password")}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                required
              />
            </FormControl>
            <div className="flex justify-between items-center mt-2">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberPassword}
                    onChange={(e) => {
                      setRememberPassword(e.target.checked);
                    }}
                  />
                }
                label={t("pages.login.rememberPassword")}
              />
              <Link href="#" className="text-sm text-blue-500">
                {t("pages.login.forgotPassword")}
              </Link>
            </div>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              disabled={!email || loading}
            >
              {loading && (
                <CircularProgress className="mr-4" color="inherit" size={16} />
              )}
              {loading ? t("pages.login.signingIn") : t("pages.login.signin")}
            </Button>
            <div className="flex justify-between items-center mt-2">
              <Typography variant="body2">
                {t("pages.login.noAccount")}{" "}
                <Link href="/register" className="text-blue-500">
                  {t("pages.login.signup")}
                </Link>
              </Typography>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
