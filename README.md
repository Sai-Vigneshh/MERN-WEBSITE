# MERN-WEBSITE
# MERN Website

## Overview

This project is a MERN stack application that includes a server-side backend and a client-side frontend. The application features user management, contact management, service management, and admin options.

- **Backend:** Node.js, Express.js, MongoDB
- **Frontend:** React.js


## Server Setup

### Overview

The server handles API requests, user authentication, data management, and other backend functionalities.

### Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/username/repository.git
    cd repository/server
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables:**

    Create a `.env` file in the `server` directory with the following content:

    ```plaintext
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/mernwebsite
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the Server:**

    ```bash
    npm start
    ```


---

## Client Setup

### Overview

The client provides the frontend interface for user interactions, including registration, profile management, and admin features.

### Installation

1. **Navigate to Client Directory:**

    ```bash
    cd repository/client
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    # or if you use yarn
    yarn install
    ```

3. **Set Up Environment Variables:**

    Create a `.env` file in the `client` directory with the following content:

    ```plaintext
    REACT_APP_API_URL=http://localhost:5000/api
    ```

4. **Run the Client:**

    ```bash
    npm start
    # or if you use yarn
    yarn start
    ```



## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a pull request.

---

