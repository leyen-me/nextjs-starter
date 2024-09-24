"use client";

import { BaseCrud, ResultColumn } from "@/components/BaseCrud";
import { DICT_KEYS } from "@/contants";
import { FiltersOption } from "@/hooks/useFilter";
import { SavePage } from "./_save";
import { LabelType } from "@prisma/client";

const RolePage = () => {
  // 基础路径
  const baseUrl = "/api/role";
  // 过滤条件选项
  const filtersOptions: FiltersOption[] = [
    {
      label: "pages.admin.role.name",
      labelType: LabelType.I18N,
      name: "name",
      type: "text",
      value: "",
    },
  ];
  // 查询结果
  const resultColumns: ResultColumn[] = [
    {
      label: "pages.common.index",
      labelType: LabelType.I18N,
      type: "index",
      name: "index",
      minWidth: 80,
    },
    {
      label: "pages.admin.role.name",
      labelType: LabelType.I18N,
      type: "text",
      name: "name",
      minWidth: 150,
    },
    {
      label: "pages.common.actions",
      labelType: LabelType.I18N,
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
      authorityMap={{
        add: "sys:role:add",
        edit: "sys:role:edit",
        delete: "sys:role:delete",
      }}
    />
  );
};

export default RolePage;
