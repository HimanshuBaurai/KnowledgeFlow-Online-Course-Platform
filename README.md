# Knowledge Flow - Educational Platform

Welcome to Knowledge Flow, an innovative educational platform designed to provide users with a seamless and enriching learning experience. Knowledge Flow focuses on streaming premium courses to empower individuals with valuable knowledge and skills.

## Features

- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform
- Real Time Payment Via RazorPay
- Cancel anytime
- Add courses lectures to playlist
- Admin can create, delete users and courses
- Dashboard with real time stats from backend for Admin

## Tech Stack

**Client:** React, Redux, Sass, ChakraUI

**Server:** Node, Express, MongoDB

## System Requirements

Knowledge Flow is designed to be accessible across various devices. Ensure that you have a stable internet connection and a compatible web browser for the best experience.

## Getting Started

To get started with Knowledge Flow, follow these simple steps:

1. **Create an Account**: Sign up for a Knowledge Flow account to unlock a world of premium courses.
2. **Browse Courses**: Explore our extensive course catalog and choose the topics that resonate with your learning goals.
3. **Subscribe**: Subscribe to start your educational journey.
4. **Stream Content**: Enjoy seamless streaming of high-quality video lessons and engage with interactive learning materials.

## Installation

### Prerequisites

Make sure you have the following tools installed on your machine:

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher) - Node.js package manager

### Clone the Repository

```bash
git clone https://github.com/HimanshuBaurai/KnowledgeFlow-Online-Course-Platform.git
cd KnowledgeFlow-Online-Course-Platform
```

### Install Dependencies

```bash
cd server
npm install 
cd ../frontend
npm install 
```

This command installs all the required dependencies listed in the package.json file.

### Run server

```bash
cd server
npm start
```

This command starts the server on port 4000.

### Run client

```bash
cd frontend
npm start
```

### Available Scripts

In the project directory, you can run the following scripts:

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file inside the `server` directory:

```bash
PORT
MONGO_URI
JWT_SECRET
FRONTEND_URL
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASSWORD
SMTP_FROM_NAME
SMTP_FROM_EMAIL
CLOUDINARY_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
PLAN_ID
RAZORPAY_API_KEY
RAZORPAY_API_SECRET
REFUND_DAYS
MY_MAIL
```

## Dockerized Setup

This project includes a containerized MERN stack setup using multi-stage Docker builds for minimal production footprint.

### Docker Components

- React frontend served by Nginx on port 3000
- Express.js backend on port 4000
- Inter-container networking via a user-defined Docker bridge
- Single `docker-compose.yml` to orchestrate build and run

### Project Structure

```bash
.
├── docker-compose.yml      # Orchestrates both services
├── frontend/               # React + multi-stage Docker build
│   ├── Dockerfile
│   └── nginx.conf
└── server/                 # Express.js server Dockerfile
    └── Dockerfile
```

### How It Works

#### Frontend

1. **Build Stage**
   - Uses `node:22.15-alpine` base image
   - Installs dependencies with `npm ci`
   - Builds React app to produce static files

2. **Production Stage**
   - Uses lightweight `nginx:alpine`
   - Serves static files on port 3000
   - Final image ~96 MB vs ~1 GB in single-stage builds

#### Backend

- Uses `node:22.15-alpine` base image
- Installs dependencies and copies source code
- Exposes port 4000 for API access

#### Networking & Port Binding

- Bridge network `mern` connects containers
- Service names act as hostnames inside the network
- Port mappings expose services to host machine

### Docker Installation (Windows 10/11)

1. **Enable Virtualization** (if required)
   - Most modern machines have this enabled by default
   - If needed, enable VT-x/AMD-V in BIOS/UEFI

2. **Enable WSL 2**
   Run in PowerShell as Administrator:

   ```powershell
   wsl --install
   dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all
   dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all
   ```

3. **Install Docker Desktop**
   - Download from <https://www.docker.com/products/docker-desktop>
   - Choose WSL 2 backend during installation

### Running with Docker Compose

From the project root:

```bash
docker-compose up --build
```

This command:

- Builds both frontend and backend images
- Creates the network
- Starts all containers

Access the application at <http://localhost:3000>
API endpoints are available at <http://localhost:4000>

To stop and remove containers:

```bash
docker-compose down
```

### Benefits of Docker Setup

- **Multi-Stage Builds**: Smaller images, faster deployment
- **Alpine Base Images**: Lightweight Linux distributions
- **Nginx for Static Content**: High performance, low memory footprint
- **Dedicated Network**: Secure container communication
- **Simplified Orchestration**: Single command to build and run everything

## Authors

- [@himanshubaurai](https://github.com/HimanshuBaurai)

## Contributing

Contributions are always welcome!

Please adhere to this project's `code of conduct`.

## License

Knowledge Flow is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License. Feel free to explore, modify, and share the platform in accordance with the terms of the license.

## Demo

Link- [@knowledgeFlow](https://knowledgeflow.vercel.app/)
