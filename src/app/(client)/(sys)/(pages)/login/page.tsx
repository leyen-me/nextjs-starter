"use client";

import React, { Suspense, useEffect } from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
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
import { getPassword, savePassword } from "@/utils/localPass";
import { useI18n } from "@/components/I18nProvider";
import IconGoogle from "@/components/icons/IconGoogle";
import IconGithub from "@/components/icons/IconGithub";
import { I18nError } from "@/utils/error";
import { AuthBg } from "../../components/AuthBg";
import { SYS_AUTH_ERROR } from "@/app/(client)/(sys)/constans";

function LoginForm() {
  const { t } = useI18n();
  const { showError } = useToast();
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
      switch (result.error) {
        case SYS_AUTH_ERROR.ACCOUNT_NOT_EXIST:
          showError(new I18nError("pages.login.accountNotExist"));
          break;
        case SYS_AUTH_ERROR.ACCOUNT_DISABLED:
          showError(new I18nError("pages.login.accountDisabled"));
          break;
        case SYS_AUTH_ERROR.PASSWORD_NOT_MATCH:
          showError(new I18nError("pages.login.passwordNotMatch"));
          break;
        default:
          showError(new I18nError("pages.login.unknownError"));
      }
      setLoading(false);
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
    await signIn("github", { callbackUrl, redirect: true });
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl, redirect: true });
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

export default function Login() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
