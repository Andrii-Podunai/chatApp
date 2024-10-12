# Chat App

This project is a simple chat application that uses Node.js for the backend and React for the frontend. It allows users to send and receive messages in real-time.

## Technologies Used
- **Node.js**: Backend framework
- **Express**: Server for the backend
- **MongoDB**: Database for storing messages
- **React**: Frontend framework
- **Docker**: For containerization
- **Docker-Compose**: To manage multi-container Docker applications

## Prerequisites
- Docker and Docker Compose installed on your machine.

## How to Run the Application

1. Clone the repository:
    ```bash
    git clone <repository_url>
    cd chat-app
    ```

2. Build and start the application with Docker Compose:
    ```bash
    docker-compose up --build -d
    ```

3. After running the command, you should see the following links in the terminal:
    - Backend API: [http://localhost:5000](http://localhost:5000)
    - Frontend: [http://localhost:3000](http://localhost:3000)
    
   You can access the frontend directly through the provided link in your browser.

4. To stop the containers, run:
    ```bash
    docker-compose down
    ```
