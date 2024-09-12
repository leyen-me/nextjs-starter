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
      menu: {
        type: {
          menu: "菜单",
          interface: "接口",
        },
        openStyle: {
          internal: "内部",
          external: "外部",
        },
      },
    },
  },
  server: {
    common: {
      failed: "操作失败",
      success: "操作成功",
      create: {
        success: "创建成功",
        failed: "创建失败",
      },
      update: {
        success: "修改成功",
        failed: "修改失败",
      },
      delete: {
        success: "删除成功",
        failed: "删除失败",
      },
      info: {
        failed: "找不到数据",
      },
    },
    config: {
      notFound: "配置不存在",
    },
    auth: {
      register: {
        emailAlreadyExists: "邮箱已注册",
      },
    },
    role: {
      create: {
        nameAlreadyExists: "角色名已存在",
      },
    },
    error: {
      internalServerError: "服务器内部错误",
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
        roles: "角色列表",
        error: {
          email: {
            required: "邮箱是必填项",
            format: "邮箱格式不正确",
          },
          password: {
            required: "密码是必填项",
          },
          nickname: {
            required: "昵称是必填项",
          },
          gender: {
            required: "性别是必填项",
          },
          mobile: {
            required: "手机号是必填项",
          },
          status: {
            required: "状态是必填项",
          },
        },
      },
      role: {
        name: "角色名",
        menuIdList: "菜单列表",
        error: {
          name: {
            required: "角色名是必填项",
          },
        },
      },
      menu: {
        parent: "父级菜单",
        name: "菜单名",
        url: "菜单路径",
        type: "菜单类型",
        openStyle: "打开方式",
        icon: "菜单图标",
        sort: "排序",
        error: {
          pid: {
            required: "父级菜单是必填项",
          },
          name: {
            required: "菜单名是必填项",
          },
          url: {
            required: "菜单路径是必填项",
          },
          type: {
            required: "菜单类型是必填项",
          },
          openStyle: {
            required: "打开方式是必填项",
          },
          sort: {
            required: "排序是必填项",
            min: "排序不能小于0",
          },
        },
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
