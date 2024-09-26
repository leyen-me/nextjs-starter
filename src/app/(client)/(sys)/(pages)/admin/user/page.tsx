"use client";

import { BaseCrud, ResultColumn } from "@/components/BaseCrud";
import { DICT_KEYS } from "@/contants";
import { FiltersOption } from "@/hooks/useFilter";
import { SavePage } from "./_save";
import { LabelType } from "@prisma/client";

const UserPage = () => {
  // 基础路径
  const baseUrl = "/api/user";
  // 过滤条件选项
  const filtersOptions: FiltersOption[] = [
    {
      label: "pages.admin.user.email",
      labelType: LabelType.I18N,
      name: "email",
      type: "text",
      value: "",
    },
    {
      label: "pages.admin.user.nickname",
      labelType: LabelType.I18N,
      name: "nickname",
      type: "text",
      value: "",
    },
    {
      label: "pages.admin.user.gender",
      labelType: LabelType.I18N,
      name: "gender",
      type: "dict",
      dictKey: DICT_KEYS.SysUserGender,
      value: "",
    },
    {
      label: "pages.admin.user.mobile",
      labelType: LabelType.I18N,
      name: "mobile",
      type: "text",
      value: "",
    },
    {
      label: "pages.admin.user.status",
      labelType: LabelType.I18N,
      name: "status",
      type: "dict",
      dictKey: DICT_KEYS.SysUserStatus,
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
      label: "pages.admin.user.email",
      labelType: LabelType.I18N,
      type: "text",
      name: "email",
      minWidth: 150,
    },
    {
      label: "pages.admin.user.nickname",
      labelType: LabelType.I18N,
      type: "text",
      name: "nickname",
      minWidth: 150,
    },
    {
      label: "pages.admin.user.gender",
      labelType: LabelType.I18N,
      type: "dict",
      dictKey: DICT_KEYS.SysUserGender,
      name: "gender",
      minWidth: 150,
    },
    {
      label: "pages.admin.user.mobile",
      labelType: LabelType.I18N,
      type: "text",
      name: "mobile",
      minWidth: 150,
    },
    {
      label: "pages.admin.user.status",
      labelType: LabelType.I18N,
      type: "dict",
      dictKey: DICT_KEYS.SysUserStatus,
      name: "status",
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
      baseUrl={baseUrl}
      filtersOptions={filtersOptions}
      resultColumns={resultColumns}
      SavePage={SavePage}
      authorityMap={{
        add: "sys:user:add",
        edit: "sys:user:edit",
        delete: "sys:user:delete",
      }}
    />
  );
};

export default UserPage;
