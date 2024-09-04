import { useDictionaryStore } from "@/stores/dictionaryStore";
import { Chip } from "@mui/material";
import { useI18n } from "./I18nProvider";

export function BaseDictTag({
  dictKey,
  value,
}: {
  dictKey: string;
  value: string;
}) {
  const { t } = useI18n();
  const { getDictItem } = useDictionaryStore();
  const Item = getDictItem(dictKey, value);
  return (
    <Chip
      label={t(Item?.label || "")}
      color={Item?.color}
      sx={{ fontSize: "12px", padding: "3px 6px" }}
    />
  );
}
