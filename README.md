# Petly API

Petly API is a NodeJS backend serves as the foundation for a project aimed at managing various services, news, notices,
and user-related functionalities. The primary tasks include setting up the development server, initializing and
connecting to the database, documenting endpoints using Swagger UI, and implementing various features related to user
authentication, services, news, notices, and user pets.

## Features

- **Authentication:** The authentication module enables users to securely register and log in. It includes token-based
  authorization, allowing for protected routes and user-specific data access. User information can be updated, and a
  logout endpoint is provided for secure session management.
- **News:** Users can retrieve a list of news items through a dedicated endpoint, facilitating the display of relevant
  and up-to-date information. The news feature is extensible, accommodating the addition of new articles and categories
  as needed.
- **Notices:** Notices can be searched by title or filtered by category, providing a versatile way for users to find
  relevant information. User-specific functionalities include adding notices to favorites, managing notices by category,
  and searching for notices by keywords.
- **Pets:** Users can add and remove pet cards through dedicated endpoints, allowing for the seamless management of
  their associated pets. This feature caters to users with pets, offering a personalized experience within the
  application.
- **Users:** The combined endpoint offers a holistic view of a user's information, including personal details and
  associated pet cards. This consolidated view simplifies user profile management, providing a single endpoint for
  retrieving comprehensive user-related data.

## Tech Stack

- **JavaScript:** JavaScript is a versatile programming language widely used for both frontend and backend development.
  In the context of this NodeJS backend, JavaScript is utilized for server-side programming, allowing developers to
  create dynamic and scalable applications.
- **Node.js:** Node.js is a runtime environment that allows developers to execute JavaScript code outside of a web
  browser. It is the foundation of this backend, providing a non-blocking, event-driven architecture that is well-suited
  for building efficient and scalable server-side applications.
- **Express:** Express is a minimalist web application framework for Node.js, providing a robust set of features for web
  and mobile applications. In this project, Express is used to build the server, handle routing, and manage HTTP
  requests, simplifying the development of RESTful APIs.
- **MongoDB:** MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. It is used as the
  backend's database, providing scalability and flexibility to handle various types of data structures efficiently.
- **Mongoose:** Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward
  schema-based solution for interacting with MongoDB, simplifying database operations and enhancing data validation.
- **Multer:** Multer is a middleware for handling multipart/form-data, primarily used for file uploads. In this backend,
  Multer facilitates the handling and storage of user-uploaded files, such as images associated with pets or user
  profiles.
- **BCrypt:** BCrypt is a cryptographic hashing algorithm designed to securely hash passwords. It is employed in this
  backend for user authentication, ensuring the secure storage of user passwords by hashing them before storage.
- **JsonWebToken:** JSON Web Tokens are a compact, URL-safe means of representing claims between two parties. JWTs are
  used in this backend for user authentication, enabling the generation of secure tokens upon successful login to manage
  user sessions and authorize protected routes.
- **Joi:** Joi is a powerful schema description language and data validator for JavaScript. It is utilized in this
  project for validating and sanitizing user input, enhancing the security and reliability of the application.
- **Cloudinary:** Cloudinary is a cloud-based image and video management service. In this backend, Cloudinary is
  integrated to handle the storage and retrieval of images, such as user avatars or pet photos, providing a scalable and
  efficient solution for media management.
- **SendGrid:** SendGrid is a cloud-based email delivery service. In this project, SendGrid is employed for sending
  transactional emails, such as account verification or password reset emails, enhancing the communication and security
  aspects of user interactions.

## Run Locally

To run the project locally, follow these steps:

1. Clone the project:

```bash
  git clone https://github.com/kristina-salnyk/petly-api.git
```

2. Go to the project directory:

```bash
  cd petly-api
```

3. Install dependencies:

```bash
  npm install
```

4. Start the development server:

```bash
  npm start
```

The server will be accessible at http://localhost:8080.

## Deployment

Explore the API endpoints and their usage by visiting the Swagger UI documentation
at [Petly API](https://petly-4cyh.onrender.com/api-doc/). This interactive documentation provides a comprehensive
overview of each endpoint, including request and response details. Use this resource to understand the backend's
functionality and streamline integration with your frontend application.
