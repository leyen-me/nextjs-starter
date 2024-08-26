简体中文 | [English](./README.md) 

# Next.js Starter

一个轻量级的Next.js启动模板，专为构建高效的管理后台而设计。这个模板为你提供了一个现代化的管理界面起点，包含了基本的功能和常用的最佳实践，帮助你快速开始开发你的管理系统。

## 特性

- **Next.js**：利用Next.js的服务器端渲染和静态生成，提升应用性能和SEO。
- **TypeScript支持**：使用TypeScript进行静态类型检查，提高代码质量和开发效率。
- **React组件**：使用React构建用户界面，实现高效的组件化开发。
- **Zustand状态管理**：轻量级的状态管理解决方案，简化全局状态管理。
- **TailwindCSS样式**：使用TailwindCSS实现快速、响应式的UI开发。
- **Shadcn UI组件**：集成Shadcn UI库，提供美观、可定制的UI组件。
- **Prisma ORM**：强大的数据库工具，简化数据库操作和管理。
- **PostgreSQL数据库**：使用可靠、高性能的PostgreSQL作为后端数据存储。
- **Framer Motion动画**：添加流畅、吸引人的界面动画效果。
- **NextAuth认证**：集成NextAuth.js，提供安全、灵活的身份验证解决方案。
- **Stripe支付集成**：支持在线支付功能，轻松处理交易。
- **ESLint代码检查**：确保代码质量和一致性的工具。
- **Prettier代码格式化**：自动格式化代码，保持代码风格统一。
- **Vercel部署**：支持一键部署到Vercel平台，简化部署流程。
- **响应式设计**：适配各种设备的用户界面。
- **主题支持**：支持自定义主题和样式，轻松实现品牌化。
- **国际化支持**：使用next-i18next实现多语言支持，轻松适应全球用户需求。

## 快速开始

### 安装依赖

首先，克隆这个仓库到本地：

```bash
git clone https://github.com/leyen-me/nextjs-starter.git
cd nextjs-starter
```

然后，安装依赖：

```bash
npm install
```

### 运行开发服务器

启动开发服务器以查看项目：

```bash
npm run dev
```

访问 `http://localhost:3000` 查看你的应用。

### 构建和部署

构建生产版本的应用：

```bash
npm run build
```

启动生产服务器：

```bash
npm start
```

## 目录结构

```plaintext
nextjs-starter/
├── public/              # 公共静态文件
├── src/                 # 源代码
│   ├── components/      # 共享组件
│   ├── pages/           # 页面文件
│   ├── styles/          # 样式文件
│   └── utils/           # 实用工具
├── .env.example         # 环境变量示例
├── next.config.js       # Next.js 配置文件
├── package.json         # 项目描述和依赖
└── README.md            # 项目说明
```

## 配置

在根目录下复制 `.env.example` 文件为 `.env`，并根据需要配置环境变量：

```env
DATABASE_URL=your-database-url
SECRET_KEY=your-secret-key
```

## 贡献

欢迎提出问题、提交功能请求或贡献代码！请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 以获取更多信息。

## 许可

此项目采用 [MIT 许可](LICENSE)，详情请参见 [LICENSE](LICENSE) 文件。

## 联系

如果你有任何问题或建议，请通过以下方式与我联系：

- 电子邮件: 672228275@qq.com
- GitHub Issues: [GitHub Issues](https://github.com/leyen-me/nextjs-starter/issues)