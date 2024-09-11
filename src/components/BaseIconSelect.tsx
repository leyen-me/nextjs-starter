import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import React from "react";
import * as Icons from "@mui/icons-material";
import { BaseDynamicIcon } from "./BaseDynamicIcon";
import Grid from "@mui/material/Grid2";

type BaseIconSelectProps = {
  label: string;
  name: string;
  value: string;
  onChange: (data: any) => void;
};

// 所有的icons-material
// 10000个
// todo: 性能优化
const allIcons = Object.keys(Icons);
// 只要实心的
const icons = allIcons.filter((icon) => icon.endsWith("Outlined"));

export function BaseIconSelect({
  label,
  name,
  value,
  onChange,
}: BaseIconSelectProps) {
  return (
    <FormControl sx={{ minWidth: 120, width: "100%" }}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        renderValue={(selected) => {
          return (
            <BaseDynamicIcon key={selected} name={selected} />
          );
        }}
      >
        {icons.map((icon) => (
          <MenuItem key={icon} value={icon}>
            <BaseDynamicIcon name={icon} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
