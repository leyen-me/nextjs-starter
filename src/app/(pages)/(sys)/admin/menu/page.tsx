"use client";

import { BaseCrud, ResultColumn } from "@/components/BaseCrud";
import { DICT_KEYS } from "@/contants";
import { FiltersOption } from "@/hooks/useFilter";
import { SavePage } from "./_save";
import { LabelType } from "@prisma/client";

const MenuPage = () => {
    // 基础路径
    const baseUrl = "/api/menu";
    // 过滤条件选项
    const filtersOptions: FiltersOption[] = [
        {
            label: "pages.admin.menu.url",
            labelType: LabelType.I18N,
            name: "url",
            type: "text",
            value: "",
        },
        {
            label: "pages.admin.menu.type",
            labelType: LabelType.I18N,
            name: "type",
            type: "dict",
            value: "",
            dictKey: DICT_KEYS.SysMenuType,
        },
    ];
    // 查询结果
    const resultColumns: ResultColumn[] = [
        {
            label: "pages.admin.menu.name",
            labelType: LabelType.I18N,
            type: "text",
            name: "name",
            minWidth: 150,
        },
        {
            label: "pages.admin.menu.url",
            labelType: LabelType.I18N,
            type: "text",
            name: "url",
            minWidth: 150,
        },
        {
            label: "pages.admin.menu.type",
            labelType: LabelType.I18N,
            type: "dict",
            name: "type",
            minWidth: 150,
            dictKey: DICT_KEYS.SysMenuType,
        },
        {
            label: "pages.admin.menu.authority",
            labelType: LabelType.I18N,
            type: "text",
            name: "authority",
            minWidth: 150,
        },
        {
            label: "pages.admin.menu.openStyle",
            labelType: LabelType.I18N,
            type: "dict",
            name: "openStyle",
            minWidth: 150,
            dictKey: DICT_KEYS.SysMenuOpenStyle,
        },
        {
            label: "pages.admin.menu.icon",
            labelType: LabelType.I18N,
            type: "icon",
            name: "icon",
            minWidth: 150,
        },
        {
            label: "pages.admin.menu.sort",
            labelType: LabelType.I18N,
            type: "text",
            name: "sort",
            minWidth: 150,
        },
        {
            label: "pages.common.actions",
            labelType: LabelType.I18N,
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
            authorityMap={{
                add: "sys:menu:add",
                edit: "sys:menu:edit",
                delete: "sys:menu:delete",
            }}
        />
    );
};

export default MenuPage;
