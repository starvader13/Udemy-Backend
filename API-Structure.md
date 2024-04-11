# API Documentation

## Overview
This document outlines the API routes for a course selling website. It covers registration, authentication, course management, and course purchases, with JWT authentication for protected routes.

## Authentication
- For routes requiring authentication, a valid JWT must be sent in the request headers.
- The JWT should be obtained through the signup/signin process and included in subsequent requests in the format: `Authorization: Bearer <actual token>`.

## Routes

### Admin Routes

#### 1. Signup

- **POST** `/admin/signup`
- **Description**: Creates a new admin account.
- **Input Body**:
  ```json
  { 
    "username": "admin",
    "email": "admin@example.com",
    "password": "admin-pass"
  }
  ```
- **Output**:
  ```json
    {
    "message": "Admin created successfully"
    }
    ```
    
#### 2. Signin

- **POST** `/admin/signin`
- **Description**: Authenticates an admin account, returning a JWT for accessing protected routes. .
- **Input Body**:
  ```json
  {
    "email": "admin@example.com",
    "password": "admin-pass"
  }
  ```
- **Output**:
  ```json
   {
     "token": "<your-token>"
   }
  ```
  
#### 3. Create Course

- **POST** `/admin/courses`
- **Description**: Creates a new course.
- **Input**:
    - **Headers**: `Authorization: Bearer <your-token>`
    - **Body**:
      ```json
      {
        "title": "course title",
        "description": "course description",
        "owner": "course owner",
        "imageLink": "https://linktoimage.com",
        "price": 100
      }
      ```
- **Output**:
  ```json
  {
    "message": "Course created successfully",
    "courseId": "newCourseId"
  }
  ```

#### 4. List Courses

- **GET** `/admin/courses`
- **Description**: Returns all the courses.
- **Input**:
    - **Headers**: `Authorization: Bearer <your-token>`
- **Output**:
  ```json
  {
    "courses": [
      {
        "id": 1,
        "title": "course title",
        "description": "course description",
        "owner": "course owner",
        "imageLink": "https://linktoimage.com",
        "price": 100,
        "published": true
      }
    ]
  }
  ```

### User Routes

#### 1. Signup

- **POST** `/users/signup` 
- **Description**: Registers a new user account. 
- **Input Body**:
  ```json
  { 
    "username": "user", 
    "email": "user@example.com", 
    "password": "user-pass" 
  }
  ```
- **Output**:
  ```json
  { 
    "message": "User created successfully" 
  }
  ```

#### 2.Signin

- **POST** `/users/signin` 
- **Description**: Authenticates a user account, returning a JWT for accessing protected routes. 
- **Input Body**:
  ```json
  { 
    "email": "user@example.com",
    "password": "user-pass"
  }
  ```
- **Output**:
  ```json
  { 
    "token": "<your-token>" 
  }
  ```

#### 3. List Courses

- **GET** `/users/courses` 
- **Description**: Lists all published courses.
- **Input**:
    **Headers**: `Authorization: Bearer <your-token>`
- **Output**:
  ```json
  {
    "courses": [
      {
        "id": "<id>",
        "title": "course title",
        "description": "course description",
        "owner": "course owner",
        "imageLink": "https://linktoimage.com",
        "price": 100,
        "published": true
      }
    ]
  }
  ```
  
#### 4. Purchase Course

- **POST** `/users/courses/:courseId`
- **Description**: Allows a user to purchase a course. The `:courseId` should be replaced with the actual ID of the course.
- **Input**:
    **Headers**: `Authorization: Bearer <your-token>`
- **Output**:
 ```json
  { 
    "message": "Course purchased successfully"
  }
 ```

### 5. List Purchased Courses

- **GET** `/users/purchasedCourses `
- **Description**: Retrieves all courses purchased by the user.
- **Input**:
    **Headers**: `Authorization: Bearer <your-token>`
- **Output**:
  ```json
  { 
    "purchasedCourses": [ 
      { 
        "_id": "<id>",
        "title": "course title", 
        "description": "course description", 
        "owner": "course owner",
        "imageLink": "https://linktoimage.com", 
        "price": 100, 
        "published": true 
      } 
    ] 
  }
  ```

## Important
- Remember to replace placeholders like `<id>`, `newCourseId`, and `<your-token>` with actual values as per your application's implementation. 
- This documentation aims to provide clarity on API usage for developers and should be updated as this API evolves.
