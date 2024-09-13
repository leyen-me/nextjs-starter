import { DictItem } from "@/app/api/config/route";
import { useDictionaryStore } from "@/stores/dictionaryStore";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useI18n } from "./I18nProvider";
import { BaseFormError } from "./BaseFormError";
import { LABEL_TYPE } from "@/contants";


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
  
  onChange: (e: SelectChangeEvent<string>) => void;
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
  onChange,
  onBlur,
  size = "small",
  allowAll = true,
}: BaseDictSelectProps) {
  const { t } = useI18n();
  const { getDictItems } = useDictionaryStore();

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
        onChange={(e) => onChange(e)}
        onBlur={onBlur}
      >
        {allowAll && <MenuItem value="">{t("common.dict.all")}</MenuItem>}
        {getDictItems(dictKey).map((item: DictItem) => {
          return (
            <MenuItem key={item.value} value={item.value}>
              {item.labelType === LABEL_TYPE.I18N ? t(item.label) : item.label}
            </MenuItem>
          );
        })}
      </Select>
      <BaseFormError error={helperText} />
    </FormControl>
  );
}
