import Image from "next/image";
import { LANGUAGES } from "@/contants";
import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useI18n } from "./I18nProvider";

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
    >
        {
            LANGUAGES.map((language) => (
                <MenuItem key={language.value} onClick={() => {
                    setLang(language.value);
                }}>
                    <Image
                        src={language.icon}
                        alt={language.label}
                        width={20}
                        height={20}
                    />
                    <span className="ml-2">{language.label}</span>
                </MenuItem>
            ))}
    </Menu>
}