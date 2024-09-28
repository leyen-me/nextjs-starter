/**
 * The title of the site displayed in the browser tab and used in various parts of the application.
 */
export const SITE_TITLE = "Nextjs Starter";

/**
 * The description of the site displayed in the browser tab and used in various parts of the application.
 */
export const SITE_DESCRIPTION = "Next, React Tailwind Admin Dashboard Template with Material-UI nextjs admin starter";

/**
 * HTTP response codes used in the application
 */
export const RESPONSE_CODE = {
  /** Successful operation */
  SUCCESS: 200,
  /** User is not authenticated or lacks necessary permissions */
  UNAUTHORIZED: 401,
  /** Requested resource could not be found */
  NOT_FOUND: 404,
  /** Server encountered an unexpected condition that prevented it from fulfilling the request */
  ERROR: 500,
};

/**
 * Available languages in the application
 * Each language object contains:
 * - label: The i18n key for the language name
 * - value: The language code used in the application
 */
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

/**
 * Default application settings
 * Contains:
 * - language: The default language for the application
 *   Uses the first language from the LANGUAGES array
 */

export const SETTING_CONFIG = {
  language: LANGUAGES[0].value,
};

/**
 * Default number of items to display per page in paginated lists
 * This value is used as the initial page size in various components
 * that implement pagination throughout the application
 */

export const DEFAULT_PAGE_SIZE = 10;

/**
 * Available options for the number of items to display per page
 * These values are used in pagination components to allow users
 * to choose how many items they want to see on each page
 */
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

/**
 * Special ID used to represent a new item being added
 * This constant is typically used in forms or operations where a new entry is being created
 * and needs to be distinguished from existing items with valid IDs
 */
export const ADD_ID = "-1";

/**
 * Constant representing the ID of the root node in a tree structure
 * This value is typically used as a special identifier for the topmost level
 * in hierarchical data structures, such as nested menus or organizational charts
 */
export const TREE_ROOT_ID = "0";

/**
 * Dictionary keys for various system enums and constants
 * These keys are used to access specific dictionaries or enumerations
 * throughout the application, ensuring consistency in naming and usage
 * 
 * LabelType: Types of labels (e.g., text, i18n)
 * SysUserGender: User gender options
 * SysUserStatus: User account status options
 * SysMenuType: Types of system menu items
 * SysMenuOpenStyle: Styles for opening menu items (e.g., internal, external)
 */
export const DICT_KEYS = {
  LabelType: "LabelType",
  SysUserGender: "SysUserGender",
  SysUserStatus: "SysUserStatus",
  SysMenuType: "SysMenuType",
  SysMenuOpenStyle: "SysMenuOpenStyle",
};

/**
 * URL for the login page
 * This constant defines the path to the login page in the application
 * It is used for redirecting users to the login page when authentication is required
 * or when users need to sign in to access certain features
 */
export const LOGIN_URL = "/login";

/**
 * URL for the account deactivated page
 * This constant defines the path to the account deactivated page in the application
 * It is used for redirecting users to the account deactivated page when their account is deactivated
 */
export const ACCOUNT_DEACTIVATED_URL = "/account-deactivated";

/**
 * URL for the account closed page
 * This constant defines the path to the account closed page in the application
 * It is used for redirecting users to the account closed page when their account is closed
 */
export const ACCOUNT_CLOSED_URL = "/account-closed";
