"use client";

import { BaseCrud, ResultColumn } from "@/components/BaseCrud";
import { DICT_KEYS, LABEL_TYPE } from "@/contants";
import { FiltersOption } from "@/hooks/useFilter";
import { SavePage } from "./_save";

const UserPage = () => {
  // 基础路径
  const baseUrl = "/api/user";
  // 过滤条件选项
  const filtersOptions: FiltersOption[] = [
    {
      label: "pages.admin.user.email",
      labelType: LABEL_TYPE.I18N,
      name: "email",
      type: "text",
      value: "",
    },
    {
      label: "pages.admin.user.nickname",
      labelType: LABEL_TYPE.I18N,
      name: "nickname",
      type: "text",
      value: "",
    },
    {
      label: "pages.admin.user.gender",
      labelType: LABEL_TYPE.I18N,
      name: "gender",
      type: "dict",
      dictKey: DICT_KEYS.Gender,
      value: "",
    },
    {
      label: "pages.admin.user.mobile",
      labelType: LABEL_TYPE.I18N,
      name: "mobile",
      type: "text",
      value: "",
    },
    {
      label: "pages.admin.user.status",
      labelType: LABEL_TYPE.I18N,
      name: "status",
      type: "dict",
      dictKey: DICT_KEYS.UserStatus,
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
      label: "pages.admin.user.email",
      labelType: LABEL_TYPE.I18N,
      type: "text",
      name: "email",
      minWidth: 150,
    },
    {
      label: "pages.admin.user.nickname",
      labelType: LABEL_TYPE.I18N,
      type: "text",
      name: "nickname",
      minWidth: 150,
    },
    {
      label: "pages.admin.user.gender",
      labelType: LABEL_TYPE.I18N,
      type: "dict",
      dictKey: DICT_KEYS.Gender,
      name: "gender",
      minWidth: 150,
    },
    {
      label:"pages.admin.user.mobile",
      labelType: LABEL_TYPE.I18N,
      type: "text",
      name: "mobile",
      minWidth: 150,
    },
    {
      label:"pages.admin.user.status",
      labelType: LABEL_TYPE.I18N,
      type: "dict",
      dictKey: DICT_KEYS.UserStatus,
      name: "status",
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

export default UserPage;
