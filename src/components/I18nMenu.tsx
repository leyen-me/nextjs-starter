import { LANGUAGES } from "@/contants";
import { Menu, MenuItem } from "@mui/material";
import { useI18n } from "./I18nProvider";
import CheckIcon from '@mui/icons-material/Check';

type I18nMenuProps = {
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
}

export function I18nMenu({ anchorEl, open, onClose }: I18nMenuProps) {
    const { t, lang, setLang } = useI18n();
    return <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        sx={{
            "& .MuiMenu-list": {
                padding: 0
            }
        }}
    >
        {
            LANGUAGES.map((language) => (
                <MenuItem sx={{
                    color: language.value === lang ? "text.primary" : "text.secondary"
                }} key={language.value} onClick={() => {
                    setLang(language.value);
                }}>
                    {t(language.label)}{language.value === lang ? <CheckIcon /> : null}
                </MenuItem>
            ))}
    </Menu>
}