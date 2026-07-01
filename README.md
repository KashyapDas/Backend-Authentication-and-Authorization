# Multi-Device Auth Architecture

This project is a complete authentication and authorization system built using Node.js, Express.js, MongoDB, and Mongoose. It implements secure user signup and signin using hashed passwords with bcrypt, along with JWT-based authentication using access tokens and refresh tokens. The system follows refresh token rotation, meaning every time an access token expires, a new access token and refresh token are generated while the old refresh token is removed from the database, improving security by making refresh tokens single-use. It also supports multi-device authentication by storing refresh tokens in a separate collection and limiting each user to a maximum of 4 active devices. Both access and refresh tokens are stored in HTTP-only cookies for safer client-side handling. This project demonstrates a practical production-style authentication flow with token invalidation, device control, and secure credential management.


## It implements:

### User Signup
### User Signin
### JWT Access Token
### JWT Refresh Token
### Refresh Token Rotation
### Device Login Limit
### Password Hashing using bcrypt
### Cookie-based Authentication
