# Aryan Thodupunuri - Portfolio

A modern portfolio website showcasing my work as a Computer Science student at UVA and incoming SDE Intern at AWS.

## About

Hi, I'm Aryan. I'm a Computer Science student at UVA and an incoming Software Development Engineer (SDE) Intern at AWS. I specialize in distributed backend systems, cloud infrastructure, and building scalable applications that solve real problems for users.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM

## Features

- Clean, minimal design with dark/light mode toggle
- Responsive layout
- Projects showcase with detailed descriptions
- Experience timeline
- Contact form with Netlify Forms integration
- Single Page Application with React Router

## Projects

- **CourseCompass**: Full-stack distributed system and Chrome Extension
- **AWS Landing Zone**: Modular Terraform-based cloud foundation
- **Extreme Weather Classification**: HPC-accelerated computer vision pipeline
- **Food Ordering System**: Event-driven microservices architecture
- **Course Picker**: Course planning tool for UVA students
- **SlackLite**: Real-time messaging application

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

## Deployment

This project is configured for deployment on Netlify.

- Build command: `npm run build`
- Publish directory: `dist`
- Includes `netlify.toml` for SPA routing

## Links

- [GitHub](https://github.com/AryanThodupunuri)
- [LinkedIn](https://linkedin.com/in/aryanthodupunuri)
- Email: aryan20544@gmail.com

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
