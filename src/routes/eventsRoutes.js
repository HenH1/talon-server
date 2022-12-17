import express from 'express';
import { getAllEventTypes, getFilteredEvents } from "../dal.js";
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Ok');
});

router.get('/getEventTypes', (req, res) => {
    getAllEventTypes().then((eventTypes) =>
        res.send(eventTypes)
    ).catch((err) => res.send(err.message));
});

router.get('/events/page/:pageNum/amount/:amountPerPage/', (req, res) => {
    const eventsNameArray = req.query.eventTypes?.split(",") || [];
    const amount = parseInt(req.params.amountPerPage);
    const skip = parseInt(req.params.pageNum) * amount;

    getFilteredEvents(eventsNameArray, amount, skip).then((eventTypes) =>
        res.send(eventTypes)
    ).catch((err) => res.send(err.message));
});

export { router };
