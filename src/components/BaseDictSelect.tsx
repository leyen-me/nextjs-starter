import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useI18n } from "./I18nProvider";
import { BaseFormError } from "./BaseFormError";
import { DictItem } from "@/app/(server)/(sys)/api/config/route";
import { LabelType } from "@prisma/client";
import { useDictStore } from "@/app/(client)/(sys)/stores/dictStore";
import { SyntheticEvent } from "react";

type BaseDictSelectProps = {
  dictKey: string;
  label: string;
  value?: string;
  allowAll?: boolean;
  name: string;
  size?: "small" | "medium";
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;

  onChange: (e: SyntheticEvent) => void;
  onBlur?: () => void;
};
export function BaseDictSelect({
  dictKey,
  label,
  value,
  name,
  fullWidth = true,
  error = false,
  helperText = "",
  size = "small",
  allowAll = true,

  onChange,
  onBlur,
}: BaseDictSelectProps) {
  const { t } = useI18n();
  const { getDictItems } = useDictStore();

  return (
    <FormControl
      error={error}
      fullWidth={fullWidth}
      variant="outlined"
      size={size}
      sx={{ minWidth: 120 }}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={(e) => onChange(e as any)}
        onBlur={onBlur}
      >
        {allowAll && <MenuItem value="">{t("common.dict.all")}</MenuItem>}
        {getDictItems(dictKey).map((item: DictItem) => {
          return (
            <MenuItem key={item.value} value={item.value}>
              {item.labelType === LabelType.I18N ? t(item.label) : item.label}
            </MenuItem>
          );
        })}
      </Select>
      <BaseFormError error={helperText} />
    </FormControl>
  );
}
