import axios from 'axios';
import dotenv from 'dotenv';
import Redis from 'ioredis';


dotenv.config(); 
const redis = new Redis()

export const getProperties = async (req,res) => {
    try {
        const {query, pickUpDate, dropOffDate, pickUpTime, dropOffTime} = req.query

        if(!query || !pickUpDate || !dropOffDate){
            return res
            .status(400)
            .json({ error: "Query, arrival_date, and departure_date are required." });

        }
        const cacheKey = `properties:${query}:${pickUpDate}:${dropOffDate}:${pickUpTime}:${dropOffTime}`;

    // Check cache before making API calls
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
          console.log('🔄 Fetching data from Redis Cache');
          return res.status(200).json(JSON.parse(cachedData));
        }

        const destinationOptions ={
            method: "GET",
            url: "https://booking-com15.p.rapidapi.com/api/v1/cars/searchDestination",
            params: { query},
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
            }

        }
        const destinationResponse = await axios.request(destinationOptions);
        

        if (
            destinationResponse.data?.data.length === 0
          ) {
            return res.status(404).json({ error: "Destination not found." });
          } 
          const latitude = destinationResponse.data.data[0].coordinates.latitude;
          const longitude = destinationResponse.data.data[0].coordinates.longitude;
          

          const vehicleOptions = {
            method: "GET",
            url: "https://booking-com15.p.rapidapi.com/api/v1/cars/searchCarRentals",
            params: { 
                pick_up_latitude: latitude,
                pick_up_longitude: longitude,
                drop_off_latitude: latitude,
                drop_off_longitude: longitude,
                pick_up_date: pickUpDate,
                drop_off_date: dropOffDate,
                pick_up_time: pickUpTime,
                drop_off_time: dropOffTime
            },
            headers: {
              "x-rapidapi-key": process.env.RAPIDAPI_KEY,
              "x-rapidapi-host": "booking-com15.p.rapidapi.com",
            },
          };
          const vehicleResponse = await axios.request(vehicleOptions);
          await redis.set(cacheKey, JSON.stringify(vehicleResponse.data), 'EX', 3600);
          console.log(vehicleResponse.data);
          return res.status(200).json(vehicleResponse.data);
          
        
        
    } catch (error) {
        console.error("Error fetching properties :",error.message);
        return res
        .status(500)
        .json({ error: "Error fetching data. Please try again later." });
        
    }

};
