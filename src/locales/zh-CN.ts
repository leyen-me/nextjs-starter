// eslint-disable-next-line import/no-anonymous-default-export
export default {
  server: {
    auth: {
      register: {
        emailAlreadyExists: "邮箱已注册",
        success: "注册成功",
      },
    },
  },
  pages: {
    login: {
      welcome: "欢迎登录后台管理",
      description: "Welcome to login",
      signwith: "或者使用",
      email: "邮箱",
      password: "密码",
      rememberPassword: "记住密码",
      forgotPassword: "忘记密码",
      noAccount: "没有账号？",
      signin: "登录",
      signingIn: "登录中...",
      signup: "注册一个账号",
      invalidCredentials: "邮箱或密码错误",
      githubError: "GitHub 登录失败",
      googleError: "Google 登录失败",
    },
    register: {
      welcome: "欢迎注册后台管理",
      description: "Welcome to register",
      email: "邮箱",
      password: "密码",
      confirmPassword: "确认密码",
      signup: "注册",
      signingUp: "注册中...",
      haveAccount: "已经有账号？",
      signin: "去登录",
      passwordMismatch: "两次输入的密码不一致",
      registerSuccess: "注册成功",
      registerFailed: "注册失败",
    },
  },
};
