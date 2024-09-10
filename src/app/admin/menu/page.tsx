"use client";

import { BaseCrud, ResultColumn } from "@/components/BaseCrud";
import { DICT_KEYS, LABEL_TYPE } from "@/contants";
import { FiltersOption } from "@/hooks/useFilter";
import { SavePage } from "./_save";

const MenuPage = () => {
    // 基础路径
    const baseUrl = "/api/menu";
    // 过滤条件选项
    const filtersOptions: FiltersOption[] = [
        {
            label: "pages.admin.role.name",
            labelType: LABEL_TYPE.I18N,
            name: "name",
            type: "text",
            value: "",
        },
    ];
    // 查询结果
    const resultColumns: ResultColumn[] = [
        {
            label: "pages.admin.menu.name",
            labelType: LABEL_TYPE.I18N,
            type: "text",
            name: "name",
            minWidth: 150,
        },
        {
            label: "pages.admin.menu.url",
            labelType: LABEL_TYPE.I18N,
            type: "text",
            name: "url",
            minWidth: 150,
        },
        {
            label: "pages.admin.menu.type",
            labelType: LABEL_TYPE.I18N,
            type: "dict",
            name: "type",
            minWidth: 150,
            dictKey: DICT_KEYS.MenuType,
        },
        {
            label: "pages.admin.menu.openStyle",
            labelType: LABEL_TYPE.I18N,
            type: "dict",
            name: "openStyle",
            minWidth: 150,
            dictKey: DICT_KEYS.MenuOpenStyle,
        },
        {
            label: "pages.admin.menu.icon",
            labelType: LABEL_TYPE.I18N,
            type: "icon",
            name: "icon",
            minWidth: 150,
        },
        {
            label: "pages.admin.menu.sort",
            labelType: LABEL_TYPE.I18N,
            type: "text",
            name: "sort",
            minWidth: 150,
        },
        {
            label: "pages.common.actions",
            labelType: LABEL_TYPE.I18N,
            type: "actions",
            name: "actions",
            minWidth: 200,
        },
    ];
    return (
        <BaseCrud
            type="tree"
            baseUrl={baseUrl}
            filtersOptions={filtersOptions}
            resultColumns={resultColumns}
            SavePage={SavePage}
        />
    );
};

export default MenuPage;
