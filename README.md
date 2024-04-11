# Udemy-Backend : A Course Selling Platform

## Introduction
This repository contains the backend implementation for a Course Selling Platform, designed to facilitate the creation, management, and purchase of online courses.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- `Node.js`
- `npm (Node Package Manager)`
- `MongoDB`

### Installing

1. **Clone the repository**
    ```bash
    git clone https://github.com/starvader13/Udemy-Backend.git
    cd course-selling-platform
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Set up environment variables**
   - A `.env.example` file is included in the root directory of the project as a template. 
   - Copy this `.env.example` file to a new file named `.env` and update it with your actual configuration values.
   ```bash
   cp .env.example .env
   ```   
   
4. **Start the server**
   ```bash
   nodemon server.js
   ```

   - This will start the server on the port specified in your `.env` file (or 3000 if not specified). 
   - You should see a message indicating that the server is running and connected to MongoDB.

### API Documentation

For detailed information on the API routes and their functionalities, please refer to the  [API Structure Documentation](./API-Structure.md)</a>.

### Built With

- [Node.js](https://nodejs.org/) - The runtime server framework.
- [Express.js](https://expressjs.com/) - The web application framework used for building web applications and APIs.
- [MongoDB](https://www.mongodb.com/) - The NoSQL database used for storing application data.
- [Zod](hhttps://zod.dev/) - A TypeScript-first schema validation with static type inference.
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling tool designed to work in an asynchronous environment.
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken) - Used for implementing JWT authentication to securely transmit information between parties as a JSON object.
- [Cors](https://expressjs.com/en/resources/middleware/cors.html) - A package to enable Cross-Origin Resource Sharing.
- [dotenv](https://www.npmjs.com/package/dotenv) - A module to load environment variables from a `.env` file into `process.env`.

### License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE) file for details.