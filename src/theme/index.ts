"use client";

import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// ... 其他导入保持不变 ...

// 创建自定义主题
export const theme = createTheme({
  shape: {
    borderRadius: 12, // 更圆润的边角
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12, // 按钮更圆润
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12, // 输入框更圆润
          },
        },
      },
    },
    // 选择框
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 12, // 选择框更圆润
        },
      },
    },
  },
});
