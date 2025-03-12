import logger from "./logger.js";
import morgan from "morgan";
import express from "express";
import 'dotenv/config'
import connectToDB from './src/dbConfig/dbConfig.js'
import userRoute from './src/views/userRoutes.js'
import cors from 'cors'

import limiter from "./src/middleware/rateLimiter.js";
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
connectToDB()
app.use(limiter);



const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use(cors())


app.use("/api",userRoute)
app.listen(port,() => {
  console.log(`Server is running on port ${port}`)
})