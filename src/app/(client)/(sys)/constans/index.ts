
/**
 * Default avatar image path for system users
 * This constant defines the file path to the default avatar image
 * used when a user hasn't uploaded a custom profile picture
 */
export const SYS_DEFAULT_USER_AVATAR = "/assets/jpg/assets-default-avatar.jpg"


/**
 * List of menu URLs that are accessible to all users
 * These routes do not require specific permissions and are available
 * to every authenticated user in the system
 * 
 * Includes:
 * - Account settings page
 * - Dynamic iframe page for external content
 */
export const SYS_CONSTENTS_MENUS = [
    "/admin/account-setting",
    "/admin/iframe/[url]",
];


/**
 * Supported image MIME types for system uploads
 * This constant defines the allowed image formats that can be uploaded in the system
 * 
 * Includes:
 * - JPEG: Joint Photographic Experts Group format
 * - PNG: Portable Network Graphics format
 * - GIF: Graphics Interchange Format
 * - WEBP: Web Picture format
 * - BMP: Bitmap Image File
 * - TIFF: Tagged Image File Format
 * - SVG: Scalable Vector Graphics format
 */
export const SYS_IMAGE_MIME_TYPE = {
    JPEG: "image/jpeg",
    PNG: "image/png",
    GIF: "image/gif",
    WEBP: "image/webp",
    BMP: "image/bmp",
    TIFF: "image/tiff",
    SVG: "image/svg+xml",
};

/**
 * Maximum size for image uploads in the system
 * This constant defines the maximum file size limit for image uploads
 * in the system, set to 10 MB
 */
export const SYS_IMAGE_MAX_SIZE = 10 * 1024 * 1024;


/**
 * Error codes and messages for authentication-related issues
 * These constants are used to standardize error handling and messaging
 * across the authentication process in the system
 * 
 * Includes:
 * - ACCOUNT_NOT_EXIST: Used when the provided account credentials do not match any existing account
 * - ACCOUNT_DISABLED: Used when the account exists but has been disabled or deactivated
 */
export const SYS_AUTH_ERROR = {
    ACCOUNT_NOT_EXIST: "AccountNotExist",
    ACCOUNT_DISABLED: "AccountDisabled",
    PASSWORD_NOT_MATCH: "PasswordNotMatch",
};
