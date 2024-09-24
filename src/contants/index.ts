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
  SysUserGender: "SysUserGender",
  SysUserStatus: "SysUserStatus",
  SysMenuType: "SysMenuType",
  SysMenuOpenStyle: "SysMenuOpenStyle",
};

// 每个人都可以访问的路由
export const CONSTENTS_MENU_URL = [
  "/admin/account-setting",
  "/admin/iframe/[url]",
];

// 图片上传的类型
export const SYS_IMAGE_MIME_TYPE = {
  JPEG: "image/jpeg",
  PNG: "image/png",
  GIF: "image/gif",
  WEBP: "image/webp",
  BMP: "image/bmp",
  TIFF: "image/tiff",
  SVG: "image/svg+xml",
};

// 图片上传的文件大小
export const SYS_IMAGE_MAX_SIZE = 10 * 1024 * 1024;
