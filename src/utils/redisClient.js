import Redis from "ioredis"
import dotenv from 'dotenv';

dotenv.config(); 

// Initialize Redis Client
const redisClient = new Redis({
  host:process.env.REDIS_HOST , // Redis server hostname
  port: process.env.REDIS_PORT,        // Redis server port
  // password: "your_redis_password", // Uncomment if Redis requires authentication
});

// Handle Redis connection errors
redisClient.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});

// Handle successful connection
redisClient.on("connect", () => {
  console.log("✅ Connected to Redis!");
});

// Export Redis client for use in other files
export default redisClient