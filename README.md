# Easy Drive

## Installation

### Backend

1. Clone the repository:
   ###
   git clone https://github.com/ajayv2001/backend-easy-drive-car-rentel-
   
   cd easy-drive-backend
   ###
3. Install dependencies:
   ###
   npm install
  ###
3. Update the `.env` file with:
  ###
   MONGO_URI=mongodb+srv://<username>:<password>@your-cluster.mongodb.net/easy_drive_db?retryWrites=true&w=majority
   REDIS_HOST=your_redis_host
   REDIS_PORT=your_redis_port
   JWT_SECRET=your_jwt_secret
   RAPIDAPI_KEY=your_rapidapi_key
   ###
4. Start the backend server:
    ###
   npm start
    ###

## RapidAPI Setup (Booking.com API)

1. Go to [RapidAPI Booking.com](https://rapidapi.com/DataCrawler/api/booking-com15/playground/apiendpoint_5af28202-3995-4657-a2de-9ec2bc1c5407).
2. Sign up or log in to RapidAPI.
3. Subscribe to the Booking.com API and retrieve your API key.
4. Update the `.env` file with:
    ###
   RAPIDAPI_KEY=your_rapidapi_key
    ###

## Environment Variables Example

Create a `.env.example` file in your backend directory with the following content:

 ###
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@your-cluster.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
SECRET_KEY=your_secret_key
RAPIDAPI_KEY=your_rapidapi_key
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
 

This allows developers to configure their own `.env` file without exposing sensitive information.

## Overview

Easy Drive is a car rental platform that allows users to search for rental cars in major cities like Paris and London. The backend is powered by Node.js, Express, MongoDB, and Redis for authentication, data management, and search optimization. It also integrates with the Booking.com API via RapidAPI to fetch rental listings.

## Features

- User authentication (Login/Signup)
- Search for rental cars in major cities
- View detailed information for each car
- Optimized performance using Redis caching
- Integration with Booking.com API for car rental listings
- Backend API for managing users and car rentals

## Tech Stack

### Backend

- **Node.js** - Server-side runtime
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Redis** - Caching & request limiting
- **JWT Authentication** - Secure user login
- **RapidAPI (Booking.com)** - Fetching car rental data

## Pending Work

- Implement payment functionality
- Dockerizing Redis
- Deployment setup

## Contributing

Feel free to fork this project and contribute by submitting a pull request.

## License

This project is licensed under the MIT License.

