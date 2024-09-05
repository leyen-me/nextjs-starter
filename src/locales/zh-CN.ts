// eslint-disable-next-line import/no-anonymous-default-export
export default {
  common: {
    dict: {
      all: "全部",
      gender: {
        male: "男",
        female: "女",
        unknown: "未知",
      },
      status: {
        normal: "启用",
        disabled: "禁用",
      },
    },
  },
  server: {
    auth: {
      register: {
        emailAlreadyExists: "邮箱已注册",
        success: "注册成功",
      },
    },
  },
  pages: {
    common: {
      add: "新增",
      delete: "删除",
      edit: "编辑",
      search: "搜索",

      reset: "重置",
      export: "导出",

      filter: "筛选",
      results: "结果",

      save: "保存",
      index: "序号",
      actions: "操作",
      pageSize: "每页显示数量",
      total: "总数",
      profile: "个人中心",
      logout: "登出",
      deleteConfirm: "确定删除这条数据吗？",
      cancel: "取消",
      deleteSuccess: "删除成功",
      deleteFailed: "删除失败",
    },
    admin: {
      user: {
        email: "邮箱",
        nickname: "昵称",
        gender: "性别",
        mobile: "手机号",
        status: "状态",
        password: "密码",
      },
    },
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
