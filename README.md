# Cracks Frontend

Frontend web application built with Next.js. This project serves as the user interface for the Cracks service, featuring a modular component structure, reusable UI elements, and integration with backend APIs.

## Features

- Built with [Next.js](https://nextjs.org/)
- Modular component architecture
- Responsive design
- Docker support for development and production
- Custom hooks and utility functions

## Project Structure

```text
frontend/
  components/      # Reusable UI components
  hooks/           # Custom React hooks
  pages/           # Next.js pages
  public/          # Static assets (images, fonts, etc.)
  styles/          # CSS and styling
  utils/           # Utility functions
  docker-compose.yml / Dockerfile  # Docker configuration
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)

### Installation

1. Navigate to the `frontend` directory:

   ```sh
   cd frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

### Running the Development Server

```sh
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Using Docker

To run the app in a Docker container:

```sh
docker-compose up --build
```

## Building for Production

```sh
npm run build
npm start
```

## Folder Overview

- `components/` - UI components grouped by feature
- `pages/` - Next.js routing and page components
- `public/` - Static files
- `styles/` - CSS and global styles
- `utils/` - Helper functions and API utilities

