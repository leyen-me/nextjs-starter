// eslint-disable-next-line import/no-anonymous-default-export
export default {
  common: {
    dict: {
      all: "全部",
      labelType: {
        text: "文本",
        i18n: "国际化",
      },
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
    language: {
      zh: "中文",
      en: "英文",
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
      upload: {
        success: "上传成功",
        failed: "上传失败",
      },
      error: {
        internalServerError: "服务器内部错误",
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
    image: {
      upload: {
        mimeType: {
          invalid: "上传的文件类型不支持",
        },
      },
    },
  },
  pages: {
    common: {
      add: "新增",
      delete: "删除",
      edit: "编辑",
      search: "搜索",

      upload: "上传",
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
      menus: {
        root: "根菜单",
        dashboard: "仪表盘",
        system: "系统",
        user: "用户",
        role: "角色",
        menu: "菜单",
        config: "配置",
      },
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
        nameType: "菜单名类型",
        error: {
          pid: {
            required: "父级菜单是必填项",
          },
          name: {
            required: "菜单名是必填项",
          },
          nameType: {
            required: "菜单名类型是必填项",
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
    accountSetting: {
      account: {
        label: "账户",
        profile: {
          title: "修改个人资料",
          description: "从这里更改您的个人资料图片",
          tip: "允许使用 JPG、GIF 或 PNG。最大大小为 800K",
        },
        password: {
          title: "密码",
          description: "密码信息",
        },
      },
      password: {
        label: "密码",
      },
    },
  },
};
