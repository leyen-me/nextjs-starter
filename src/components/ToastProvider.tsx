"use client";

import React, { createContext, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useI18n } from "./I18nProvider";
import { I18nError } from "@/utils/error";
import { LabelType } from "@prisma/client";

type ToastType = "success" | "error" | "info" | "warning";

type SuccessOrErrorType = {
  message: string;
  messageType?: LabelType;
  [key: string]: any;
};

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
  showSuccess: (data: SuccessOrErrorType) => void;
  showError: (error: SuccessOrErrorType | I18nError) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType>("info");
  const { t } = useI18n();


  const showToast = (message: string, type: ToastType = "info") => {
    setMessage(message);
    setType(type);
    setOpen(true);
  };

  const showSuccess = (data: SuccessOrErrorType) => {
    if (data.messageType) {
      if (data.messageType === LabelType.I18N) {
        showToast(t(data.message), "success");
      } else {
        showToast(data.message, "success");
      }
    } else {
      showToast(data.message, "success");
    }
  };

  const showError = (error: SuccessOrErrorType | I18nError) => {
    if (error.messageType) {
      if (error.messageType === LabelType.I18N) {
        showToast(t(error.message), "error");
      } else {
        showToast(error.message, "error");
      }
    } else {
      showToast(error.message, "error");
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showError }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
