import dotenv from 'dotenv';
// import environment variables 
dotenv.config();
import express from 'express';
import { router as events_routes } from './src/routes/eventsRoutes.js'
import { initDB } from './src/dal.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(events_routes);

app.listen(port, () => {
    // connect to the db each time server is running
    initDB()
        .catch(console.error);
})
