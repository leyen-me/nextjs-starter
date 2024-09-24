English | [简体中文](./README-zh_CN.md)

# Next.js Starter

A lightweight Next.js starter template designed for building efficient admin dashboards. This template provides you with a modern starting point for your management interface, including basic functionalities and common best practices to help you quickly begin developing your management system.

## Features

- **Next.js**: Leverage Next.js server-side rendering and static generation to enhance application performance and SEO.
- **TypeScript Support**: Use TypeScript for static type checking to improve code quality and development efficiency.
- **React Components**: Build user interfaces with React, enabling efficient component-based development.
- **Zustand State Management**: A lightweight state management solution to simplify global state management.
- **TailwindCSS Styling**: Utilize TailwindCSS for rapid, responsive UI development.
- **Material-UI**: Integrate Material-UI library for beautiful, customizable UI components.
- **Prisma ORM**: A powerful database tool that simplifies database operations and management.
- **PostgreSQL Database**: Use reliable, high-performance PostgreSQL as the backend data storage.
- **Framer Motion Animations**: Add smooth, engaging interface animation effects.
- **NextAuth Authentication**: Integrate NextAuth.js for secure, flexible authentication solutions.
- **Stripe Payment Integration**: Support online payment functionality for easy transaction handling.
- **ESLint Code Checking**: A tool to ensure code quality and consistency.
- **Prettier Code Formatting**: Automatically format code to maintain consistent code style.
- **Vercel Deployment**: Support one-click deployment to the Vercel platform, simplifying the deployment process.
- **Responsive Design**: User interface adaptable to various devices.
- **Theme Support**: Support for custom themes and styles, easily achieve branding.
- **Internationalization Support**: Use next-i18next for multi-language support, easily adapting to global user needs.

## Quick Start

### Install Dependencies

First, clone this repository to your local machine:

```bash
git clone https://github.com/leyen-me/nextjs-starter.git
cd nextjs-starter
```

Then, install the dependencies:

```bash
npm install
```

### Run Development Server

Start the development server to view the project:

```bash
npm run dev
```

Visit `http://localhost:3000` to view your application.

### Build and Deploy

Build the production version of the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Directory Structure

```plaintext
nextjs-starter/
├── public/              # Public static files
├── src/                 # Source code
│   ├── components/      # Shared components
│   ├── pages/           # Page files
│   ├── styles/          # Style files
│   └── utils/           # Utility tools
├── .env.example         # Environment variable example
├── next.config.js       # Next.js configuration file
├── package.json         # Project description and dependencies
└── README.md            # Project documentation
```

## Configuration

Copy the `.env.example` file in the root directory to `.env`, and configure the environment variables as needed:

```env
DATABASE_URL=your-database-url
SECRET_KEY=your-secret-key
```

## Contributing

We welcome issues, feature requests, or code contributions! Please check [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## License

This project is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, please contact me through the following channels:

- Email: 672228275@qq.com
- GitHub Issues: [GitHub Issues](https://github.com/leyen-me/nextjs-starter/issues)
