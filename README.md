# VTFrontend

A Next.js frontend for the VisionTransformer Platform, providing a user interface to upload images, track inference jobs, and visualize segmentation results.

---

## Overview

This repository contains the frontend application for the VisionTransformer Platform. It allows users to:

1. Authenticate and manage sessions.  
2. Upload input images for inference.  
3. View real-time job status and retrieve segmentation masks.  
4. Browse past inference results in a gallery.

---

## Features

- Built with **Next.js** and **React**  
- **File upload** component with drag-and-drop support  
- **Result gallery** with image previews and download links  
- **Responsive design** for desktop and mobile  
- **Environment-driven** API endpoints  

---

## Tech Stack

- **Framework:** Next.js 13 (App Router)  
- **Language:** Javascript
- **Styling:** CSS Modules
- **Bundler:** Webpack (built-in)  
- **Containerization:** Docker & Docker Compose  

---

## Prerequisites

- Node.js ≥ 18  
- npm ≥ 8 or Yarn ≥ 1.22  
- Docker & Docker Compose (optional, for containerized development)  

---

## Installation & Development

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-org/VTFrontend.git
   cd VTFrontend
   ```

2. **Install dependencies**  
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run in development mode**  
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Production & Deployment

1. **Build the application**  
   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Start the production server**  
   ```bash
   npm start
   # or
   yarn start
   ```

3. **Dockerized**  
   ```bash
   docker-compose up --build -d
   ```
   This will build the Docker image and start the container on port 3000.

---
