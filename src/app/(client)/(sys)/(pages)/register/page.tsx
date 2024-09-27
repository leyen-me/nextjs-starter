"use client";

import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import CircularProgress from "@mui/material/CircularProgress";
import FormHelperText from "@mui/material/FormHelperText";

import { useToast } from "@/components/ToastProvider";
import api from "@/utils/request";
import { useI18n } from "@/components/I18nProvider";
import { AuthBg } from "../../components/AuthBg";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const { t } = useI18n();
  const { showSuccess, showError } = useToast();

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/api/auth/register", { email, password });
      showSuccess(res);
      setTimeout(() => {
        router.push(callbackUrl);
      }, 1000);
    } catch (error: any) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError(
        t("pages.register.passwordMismatch") || "Passwords do not match"
      );
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="flex flex-col h-full justify-between xl:flex-row">
      {/* left or top */}
      <AuthBg />
      {/* right or bottom */}
      <div className="w-full xl:w-1/3 p-6 h-full flex flex-col justify-center ">
        <div className="mx-auto w-full max-w-[400px]">
          <h1 className="mx-0 mb-1 text-2xl font-bold">
            {t("pages.register.welcome")}
          </h1>
          <p className="mx-0 mb-8 text-sm text-gray-500">
            {t("pages.register.description")}
          </p>
          <form onSubmit={handleEmailRegister} className="flex flex-col gap-4">
            <TextField
              fullWidth
              label={t("pages.register.email")}
              variant="outlined"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                {t("pages.register.password")}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                required
              />
            </FormControl>
            <FormControl fullWidth variant="outlined" error={!!passwordError}>
              <InputLabel htmlFor="outlined-adornment-confirm-password">
                {t("pages.register.confirmPassword")}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={validatePassword}
                label={t("pages.register.confirmPassword")}
                required
              />
              {passwordError && (
                <FormHelperText>{passwordError}</FormHelperText>
              )}
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              disabled={!email || loading || !!passwordError}
            >
              {loading && (
                <CircularProgress className="mr-4" color="inherit" size={16} />
              )}
              {loading
                ? t("pages.register.signingUp")
                : t("pages.register.signup")}
            </Button>
            <div className="flex justify-between items-center mt-2">
              <Typography variant="body2">
                {t("pages.register.haveAccount")}{" "}
                <Link href="/login" className="text-blue-500">
                  {t("pages.register.signin")}
                </Link>
              </Typography>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Register() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
