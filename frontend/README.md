# Chat Application

This project is a simple chat application built with React for the frontend and Node.js for the backend. It allows users to send and receive messages in real time, manage their message history, and authenticate their sessions.

## Getting Started

To get started with the chat application, follow the instructions below.

### Prerequisites

- Make sure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed on your machine.

### Running the Application

1. Clone the repository:
    ```bash
    git clone <repository_url>
    cd chatApp
    ```

2. Build and start the application using Docker Compose:
    ```bash
    docker-compose up --build -d
    ```

3. Once the application is running, you can access it via:
    - Backend API: [http://localhost:5000](http://localhost:5000)
    - Frontend: [http://localhost:3000](http://localhost:3000)

4. To stop the application, run:
    ```bash
    docker-compose down
    ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run test`

Launches the test runner and generates reports.\
This command will run all tests, merge the reports, and open the final report in your browser.

### `npm run build`

Builds the app for production to the `build` folder.\
This command optimizes the build for performance and prepares the app for deployment.
