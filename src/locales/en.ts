// eslint-disable-next-line import/no-anonymous-default-export
export default {
  common: {
    dict: {
      all: "All",
      labelType: {
        text: "Text",
        i18n: "Internationalization",
      },
      gender: {
        male: "Male",
        female: "Female",
        unknown: "Unknown",
      },
      status: {
        normal: "Enabled",
        disabled: "Disabled",
      },
      menu: {
        type: {
          menu: "Menu",
          interface: "Interface",
        },
        openStyle: {
          internal: "Internal",
          external: "External",
        },
      },
    },
    language: {
      zh: "Chinese",
      en: "English",
    },
  },
  server: {
    common: {
      failed: "Operation failed",
      success: "Operation successful",
      create: {
        success: "Creation successful",
        failed: "Creation failed",
      },
      update: {
        success: "Update successful",
        failed: "Update failed",
      },
      delete: {
        success: "Deletion successful",
        failed: "Deletion failed",
      },
      info: {
        failed: "Data not found",
      },
      upload: {
        success: "Upload successful",
        failed: "Upload failed",
      },
      error: {
        internalServerError: "Internal server error",
        networkError: "Network error",
        notFound: "Request not found",
      },
    },
    config: {
      notFound: "Configuration not found",
    },
    auth: {
      loginExpired: "Login expired",
      authority: {
        insufficient: "Insufficient permissions",
      },
      register: {
        emailAlreadyExists: "Email already registered",
      },
    },
    role: {
      create: {
        nameAlreadyExists: "Role name already exists",
      },
    },
    image: {
      upload: {
        mimeType: {
          invalid: "Unsupported file type",
        },
        size: {
          invalid: "Image size must be less than 10MB",
        },
      },
    },
  },
  pages: {
    common: {
      add: "Add",
      delete: "Delete",
      edit: "Edit",
      search: "Search",

      upload: "Upload",
      reset: "Reset",
      export: "Export",

      filter: "Filter",
      results: "Results",

      save: "Save",
      update: "Update",

      index: "Index",
      actions: "Actions",
      pageSize: "Items per page",
      total: "Total",
      profile: "Profile",
      logout: "Logout",
      deleteConfirm: "Are you sure you want to delete this data?",
      cancel: "Cancel",
      deleteSuccess: "Deletion successful",
      deleteFailed: "Deletion failed",

      interface: {
        add: "Add",
        delete: "Delete",
        edit: "Edit",
        info: "Info",
        list: "List",
        page: "Page",
      },
    },
    admin: {
      menus: {
        root: "Root Menu",
        dashboard: "Dashboard",
        system: "System",
        user: "User",
        role: "Role",
        menu: "Menu",
        config: "Config",
      },
      user: {
        email: "Email",
        nickname: "Nickname",
        gender: "Gender",
        mobile: "Mobile",
        status: "Status",
        password: "Password",
        roles: "Role List",
        error: {
          email: {
            required: "Email is required",
            format: "Invalid email format",
          },
          password: {
            required: "Password is required",
          },
          nickname: {
            required: "Nickname is required",
          },
          gender: {
            required: "Gender is required",
          },
          mobile: {
            required: "Mobile number is required",
          },
          status: {
            required: "Status is required",
          },
        },
      },
      role: {
        name: "Role Name",
        menuIdList: "Menu List",
        authorityMenuIdList: "Authority List",
        warning: {
          authorityMenu: "Please do not select menus as authorities",
        },
        error: {
          name: {
            required: "Role name is required",
          },
        },
      },
      menu: {
        parent: "Parent Menu",
        name: "Menu Name",
        url: "Menu URL",
        type: "Menu Type",
        authority: "Authority Identifier",
        openStyle: "Open Style",
        icon: "Menu Icon",
        sort: "Sort",
        nameType: "Menu Name Type",
        error: {
          pid: {
            required: "Parent menu is required",
          },
          name: {
            required: "Menu name is required",
          },
          nameType: {
            required: "Menu name type is required",
          },
          url: {
            required: "Menu URL is required",
          },
          type: {
            required: "Menu type is required",
          },
          openStyle: {
            required: "Open style is required",
          },
          sort: {
            required: "Sort is required",
            min: "Sort cannot be less than 0",
          },
        },
      },
    },
    login: {
      welcome: "Welcome to the admin panel",
      description: "Welcome to login",
      signwith: "Or sign in with",
      email: "Email",
      password: "Password",
      rememberPassword: "Remember password",
      forgotPassword: "Forgot password",
      noAccount: "Don't have an account?",
      signin: "Sign in",
      signingIn: "Signing in...",
      signup: "Sign up",

      accountNotExist: "Account does not exist",
      accountDisabled: "Account has been disabled",
      passwordNotMatch: "Passwords do not match",
      unknownError: "Unknown error",
    },
    register: {
      welcome: "Welcome to register",
      description: "Welcome to register",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",
      signup: "Sign up",
      signingUp: "Signing up...",
      haveAccount: "Already have an account?",
      signin: "Sign in",
      passwordMismatch: "Passwords do not match",
      registerSuccess: "Registration successful",
      registerFailed: "Registration failed",
    },
    accountSetting: {
      account: {
        label: "Account",
        profile: {
          title: "Edit Profile",
          description: "Change your profile picture here",
          tip: "Allowed file types: JPG, GIF, or PNG. Max size: 800K",
        },
        password: {
          title: "Change Password",
          description: "Change your password here",
        },
        detail: {
          title: "Edit Account Information",
          description: "Change your account information here",
        },
      },
      password: {
        label: "Password",
      },
    },
    accountDeactivated: {
      title: "Account Deactivated",
      description: "Your account has been deactivated. Please contact support for more information.",
      button: {
        back: "Back",
      },
    },
    accountClosed: {
      title: "Account Closed or Not Registered",
      description: "Your account has been closed or is not registered. Please contact support for more information.",
      button: {
        back: "Back",
      },
    },
  },
};
