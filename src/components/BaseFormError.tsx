import { FormHelperText } from "@mui/material";

export function BaseFormError({ error }: { error: string }) {
  return error ? <FormHelperText>{error}</FormHelperText> : null;
}