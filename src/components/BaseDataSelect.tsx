import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import React from "react";

type BaseDataSelectProps = {
  label: string;
  name: string;
  value: string[];
  data: any[];
  onChange: (data: any) => void;
};

export function BaseDataSelect({
  label,
  name,
  value = [],
  data,
  onChange,
}: BaseDataSelectProps) {
  return (
    <div>
      <FormControl sx={{ minWidth: 120, width: "100%" }}>
        <InputLabel>{label}</InputLabel>
        <Select
          multiple
          name={name}
          value={value}
          onChange={onChange}
          input={<OutlinedInput label={label} />}
        >
          {data.map((item) => (
            <MenuItem
              key={item.id}
              value={item.id}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
