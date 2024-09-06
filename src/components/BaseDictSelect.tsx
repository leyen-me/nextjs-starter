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

export function BaseDictSelect({
  dictKey,
  label,
  value,
  name,
  onChange,
  onBlur,
  size = "small",
  allowAll = true,
}: {
  dictKey: string;
  label: string;
  value?: string;
  allowAll?: boolean;
  name: string;
  size?: "small" | "medium";
  onChange: (e: SelectChangeEvent<string>) => void;
  onBlur?: () => void;
}) {
  const { t } = useI18n();
  const { getDictItems } = useDictionaryStore();

  return (
    <FormControl variant="outlined" size={size} sx={{ minWidth: 120 }}>
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
              {item.labelType === "i18n" ? t(item.label) : item.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
