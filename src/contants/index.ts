export const RESPONSE_CODE = {
  SUCCESS: 200,
  ERROR: 500,
};

export const LANGUAGES = [
  {
    label: "Chinese",
    value: "zh-CN",
  },
  {
    label: "English",
    value: "en",
  },
];

export const SETTING_CONFIG = {
  language: LANGUAGES[0].value,
};

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export const DICT_KEYS = {
  LabelType: "LabelType",
  Gender: "Gender",
  UserStatus: "UserStatus",
  MenuType: "MenuType",
  MenuOpenStyle: "MenuOpenStyle",
};

export const ADD_ID = "-1";
export const TREE_ROOT_ID = "0";

export const LABEL_TYPE = {
  I18N: "I18N",
  TEXT: "TEXT",
} as const;

export type LabelType = (typeof LABEL_TYPE)[keyof typeof LABEL_TYPE];

export const MENU_OPEN_STYLE = {
  INTERNAL: "INTERNAL",
  EXTERNAL: "EXTERNAL",
} as const;

export type MenuOpenStyle = (typeof MENU_OPEN_STYLE)[keyof typeof MENU_OPEN_STYLE];