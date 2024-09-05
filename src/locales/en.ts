// eslint-disable-next-line import/no-anonymous-default-export
export default {
  common: {
    dict: {
      all: "All",
      gender: {
        male: "Male",
        female: "Female",
        unknown: "Unknown",
      },
      status: {
        normal: "Enabled",
        disabled: "Disabled",
      },
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
    },
    config: {
      notFound: "Configuration not found",
    },
    auth: {
      register: {
        emailAlreadyExists: "Email already exists",
        success: "Registration successful",
      },
    },
  },
  pages: {
    common: {
      add: "Add",
      delete: "Delete",
      edit: "Edit",
      search: "Search",
      reset: "Reset",
      export: "Export",
      filter: "Filter",
      results: "Results",
      save: "Save",
      index: "Index",
      actions: "Actions",
      pageSize: "Items per page",
      total: "Total",
      profile: "Profile",
      logout: "Logout",
      deleteConfirm: "Are you sure you want to delete this data?",
      cancel: "Cancel",
      deleteSuccess: "Delete successful",
      deleteFailed: "Delete failed",
    },
    admin: {
      user: {
        email: "Email",
        nickname: "Nickname",
        gender: "Gender",
        mobile: "Mobile",
        status: "Status",
        password: "Password",
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
    },
    login: {
      welcome: "Welcome to Admin Dashboard",
      description: "Welcome to login",
      signwith: "or sign in with",
      email: "Email",
      password: "Password",
      rememberPassword: "Remember Password",
      forgotPassword: "Forgot Password",
      noAccount: "Don't have an account?",
      signin: "Sign In",
      signingIn: "Signing In...",
      signup: "Create an account",
      invalidCredentials: "Invalid email or password",
      githubError: "GitHub login failed",
      googleError: "Google login failed",
    },
    register: {
      welcome: "Welcome to Admin Registration",
      description: "Welcome to register",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      signup: "Sign Up",
      signingUp: "Signing Up...",
      haveAccount: "Already have an account?",
      signin: "Sign In",
      passwordMismatch: "Passwords do not match",
      registerSuccess: "Registration successful",
      registerFailed: "Registration failed",
    },
  },
};
