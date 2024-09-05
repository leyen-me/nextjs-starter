"use client";

import { BaseCrud, ResultColumn } from "@/components/BaseCrud";
import { DICT_KEYS, LABEL_TYPE } from "@/contants";
import { FiltersOption } from "@/hooks/useFilter";
import { SavePage } from "./_save";

const RolePage = () => {
    // 基础路径
    const baseUrl = "/api/role";
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
            label: "pages.common.index",
            labelType: LABEL_TYPE.I18N,
            type: "index",
            name: "index",
            minWidth: 80,
        },
        {
            label: "pages.admin.role.name",
            labelType: LABEL_TYPE.I18N,
            type: "text",
            name: "name",
            minWidth: 150,
        },
        {
            label: "pages.common.actions",
            labelType: LABEL_TYPE.I18N,
            type: "actions",
            name: "actions",
            minWidth: 150,
        },
    ];
    return (
        <BaseCrud
            baseUrl={baseUrl}
            filtersOptions={filtersOptions}
            resultColumns={resultColumns}
            SavePage={SavePage}
        />
    );
};

export default RolePage;
