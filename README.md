# Portfolio

A clean, minimalist portfolio website showcasing my work as a software engineer. Built with Next.js
15, TypeScript, and Tailwind CSS.

## Features

- Clean, professional design inspired by modern minimalism
- Responsive layout that works on all devices
- Contact form for inquiries
- Integration with GitHub API to display recent activity
- Showcase of featured projects
- Skills and technologies overview

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mlnbk/mlnbk_portfolio.git
   cd mlnbk_portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file:

   ```bash
   # Required for contact form
   GMAIL_USERNAME=your-email@gmail.com
   GMAIL_PASSWORD=your-app-password

   # Optional: GitHub Personal Access Token for higher API rate limits
   # Without this, GitHub API requests are limited to 60 requests/hour (unauthenticated)
   # With a token, you get 5,000 requests/hour
   # Get one at: https://github.com/settings/tokens (classic token, no scopes needed)
   GH_PERSONAL_ACCESS_TOKEN=your-github-token
   ```

   **Note:** The GitHub token is completely optional. The app works fine without it, but you'll have
   lower rate limits. The contact form requires Gmail credentials.

### Running the Application

Start the development server:

```bash
npm run start:dev
```

The application will run on `http://localhost:3000`.

### Building for Production

```bash
npm run build
npm start
```

## Technologies

- **Framework**: Next.js 15
- **Language**: TypeScript 5.5
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form
- **Email**: Nodemailer
- **Package Manager**: npm

## Project Structure

```
.
├── app/              # Next.js App Router
│   ├── api/         # API routes
│   ├── layout.tsx   # Root layout
│   └── page.tsx     # Home page
├── components/       # React components
├── hooks/           # Custom React hooks
├── constants/       # Constants and configuration
└── types/           # TypeScript type definitions
```

## License

This project is open source and available under the MIT License.
