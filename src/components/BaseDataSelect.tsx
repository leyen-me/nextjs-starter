import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import React from "react";
import { useTheme } from "./ThemeProvider";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

// function getStyles(name: string, personName: string[], theme: Theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

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
  const { theme } = useTheme();
  
  //   const [personName, setPersonName] = React.useState<string[]>([]);

  //   const handleChange = (event: SelectChangeEvent<typeof personName>) => {
  //     const {
  //       target: { value },
  //     } = event;
  //     setPersonName(
  //       // On autofill we get a stringified value.
  //       typeof value === "string" ? value.split(",") : value
  //     );
  //   };

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
