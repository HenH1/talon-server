import express from 'express';
import { getAllEventTypes, getFilteredEvents } from "../dal.js";
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Ok');
});

router.get('/getEventTypes', async (req, res) => {
    try {
        const eventTypes = await getAllEventTypes();
        res.send(eventTypes);
    }
    catch (err) {
        res.send(err.message);
    };
});

router.get('/events/page/:pageNum/amount/:amountPerPage/', async (req, res) => {
    const eventsNameArray = req.query.eventTypes?.split(",") || [];
    const amount = parseInt(req.params.amountPerPage);
    const skip = parseInt(req.params.pageNum) * amount;

    try {
        const events = await getFilteredEvents(eventsNameArray, amount, skip);
        res.send(events);
    }
    catch (err) {
        res.send(err.message);
    };
});

export { router };
