# Portfolio

A portfolio website showcasing my work as a software engineer. Built with React, TypeScript, and Tailwind CSS.

## Features

- Clean, professional design inspired by modern minimalism
- Responsive layout that works on all devices
- Contact form for inquiries
- Integration with GitHub API to display recent activity
- Showcase of featured projects
- Skills and technologies overview

## Project Structure

The project is divided into two main parts:

1. **API**: Backend application built with NestJS, serving data required by the frontend. See [api/README.md](api/README.md) for details.

2. **Web**: Frontend application built with React and Tailwind CSS, providing a clean and professional user interface. See [web/README.md](web/README.md) for details.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mlnbk/mlnbk_portfolio.git
   cd mlnbk_portfolio
   ```

2. Install backend dependencies:

   ```bash
   cd api
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../web
   npm install
   ```

### Running the Application

1. Start the backend server:

   ```bash
   cd api
   npm run start:dev
   ```

   The API will run on `http://localhost:3001` (or the port specified in your environment).

2. Start the frontend development server:
   ```bash
   cd web
   npm run start
   ```
   The frontend will run on `http://localhost:3000`.

## Technologies

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: NestJS, TypeScript
- **Build Tool**: Create React App
- **Package Manager**: npm

## License

This project is open source and available under the MIT License.
