export const RESPONSE_CODE = {
  SUCCESS: 200,
  ERROR: 500,
};

export const LANGUAGES = [
  {
    label: "common.language.zh",
    value: "zh-CN",
  },
  {
    label: "common.language.en",
    value: "en",
  },
];

export const SETTING_CONFIG = {
  language: LANGUAGES[0].value,
};

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export const ADD_ID = "-1";
export const TREE_ROOT_ID = "0";

export const DICT_KEYS = {
  LabelType: "LabelType",
  Gender: "Gender",
  UserStatus: "UserStatus",
  MenuType: "MenuType",
  MenuOpenStyle: "MenuOpenStyle",
};

export const LABEL_TYPE = {
  I18N: "I18N",
  TEXT: "TEXT",
} as const;

export type LabelType = (typeof LABEL_TYPE)[keyof typeof LABEL_TYPE];

export const MENU_OPEN_STYLE = {
  INTERNAL: "INTERNAL",
  EXTERNAL: "EXTERNAL",
} as const;

export type MenuOpenStyle =
  (typeof MENU_OPEN_STYLE)[keyof typeof MENU_OPEN_STYLE];

export const MENU_TYPE = {
  MENU: "MENU",
  INTERFACE: "INTERFACE",
} as const;

export type MenuType = (typeof MENU_TYPE)[keyof typeof MENU_TYPE];

// 每个人都可以访问的路由
export const CONSTENTS_MENU_URL = [
  "/admin/account-setting",
  "/admin/iframe/[url]",
];

// 图片上传的类型
export const IMAGE_MIME_TYPE = {
  JPEG: "image/jpeg",
  PNG: "image/png",
  GIF: "image/gif",
  WEBP: "image/webp",
  BMP: "image/bmp",
  TIFF: "image/tiff",
  SVG: "image/svg+xml",
};

// 图片上传的文件大小
export const IMAGE_MAX_SIZE = 10 * 1024 * 1024;
