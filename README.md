# Chat App

This project is a simple chat application that uses Node.js for the backend and React for the frontend. It allows users to send and receive messages in real-time.

## Technologies Used
- **Node.js**: Backend framework
- **Express**: Server for the backend
- **MongoDB**: Database for storing messages
- **React**: Frontend framework
- **Docker**: For containerization
- **Docker-Compose**: To manage multi-container Docker applications

## User Stories

### 1. User Login
**As** a user,  
**I want** to log into the chat application,  
**So that** I can access chat features and communicate with other users.

---

### 2. Sending Messages
**As** a user,  
**I want** to send messages,  
**So that** I can communicate with other users in real time.

---

### 3. Deleting My Messages
**As** a user,  
**I want** to delete only my messages,  
**So that** I can keep the chat organized and remove unnecessary messages.

---

### 4. Viewing Message History
**As** a user,  
**I want** to view the history of old messages,  
**So that** I can find important information or track previous conversations.

---

### 5. User Logout
**As** a user,  
**I want** to log out of the chat application,  
**So that** I can protect my privacy and security when I'm done chatting.

---

## Prerequisites
- Docker and Docker Compose installed on your machine.

## How to Run the Application

1. Clone the repository:
    ```bash
    git clone <repository_url>
    cd chatApp
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

## Running Tests

1. Navigate to the `/testing` directory of your project:
    ```bash
    cd testing
    ```

2. Install dependencies with the following command:
    ```bash
    npm i
    ```

3. Run the tests with the following command:
    ```bash
    npm run test
    ```

This will execute the tests, generate the reports, and automatically open the final report in your default browser.
