# CMMS (Computerized Maintenance Management System)

This is a Next.js-based CMMS application designed to help manage maintenance operations efficiently.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

To get the project up and running on your local machine, follow these steps:

1. Clone the repository:

   \`\`\`bash
   git clone https://github.com/your-username/cmms-nextjs.git
   cd cmms-nextjs
   \`\`\`

2. Install the dependencies:

   \`\`\`bash
   npm install
   \`\`\`

3. Create a \`.env.local\` file in the root directory and add the following environment variables:

   \`\`\`
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   \`\`\`

   Note: Adjust the API URL if your backend is running on a different port or host.

## Running the Application

To run the application in development mode:

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- \`/app\`: Contains the application routes and page components
- \`/components\`: Reusable React components
- \`/lib\`: Utility functions and custom hooks
- \`/public\`: Static assets
- \`/styles\`: Global styles and CSS modules

## Available Scripts

In the project directory, you can run:

- \`npm run dev\`: Runs the app in development mode
- \`npm run build\`: Builds the app for production
- \`npm start\`: Runs the built app in production mode
- \`npm run lint\`: Lints the codebase using ESLint

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

