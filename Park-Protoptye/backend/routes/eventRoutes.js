const express = require('express')
const route = express.Router()
const event = require('../models/event')

route.post('/events', async(req, res) => {
    const newEvent = req.body;
    if(JSON.stringify(newEvent) == null || JSON.stringify(newEvent) == '{}') {
        return res.status(400).send({
            message: "facility's content can not be empty"
        });
    }
    else {

    try {
        const occasion = new event(newEvent)
        await occasion.save()
        res.status(201).send(occasion)
    }
    catch(error) {
        res.status(500).send(error)
    }
}
});

route.get('/events', async(req, res) => {
    try {
        const events = await equipment.find({})
        res.status(200).send(events)
    }
    catch(error) {
        res.status(500).send(error)
    }
});
route.get('/events/keyword', async(req, res) => {
    let keyword = req.query.name

    if(JSON.stringify(keyword) == null || JSON.stringify(keyword) == '{}') {
        return res.status(400).send({
            message: "Facility keyword can not be empty"
        });
    }
    else {
    try {
        const events = await event.find({ $or: [{title: `/^${keyword} `}, {title: `/${keyword} $/`}, {facilityName: `/ ${keyword} /`}
    , {facilityName: `/^${keyword}`}, {facilityName: `${keyword}$/`}, {facilityName: `/${keyword}/`}]})
        res.status(200).send(events)
    }
    catch(error) {
        res.status(500).send(error)
    }
}
});
route.get('/events/date', async(req, res) => {
    let date = req.query.date

    if(JSON.stringify(date) == null || JSON.stringify(date) == '{}') {
        return res.status(400).send({
            message: "date can not be empty"
        });
    }
    else {
    try {
        const events = await event.find({date: date})
        res.status(200).send(events)
    }
    catch(error) {
        res.status(500).send(error)
    }
}
});
route.get('/events/date-range', async(req, res) => {
    let start_date = req.query.start_date
    let end_date = req.query.end_date

    if(JSON.stringify(start_date) == null && JSON.stringify(end_date) == null ||
    JSON.stringify(start_date) == '{}' && JSON.stringify(end_date) == '{}') {
        return res.status(400).send({
            message: "Range of dates can not be empty"
        });
    }
    else {
    try {
        const events = await event.find({date: {$gte: ISODate(start_date), $lte: ISODate(end_date)}})
        res.status(200).send(events)
    }
    catch(error) {
        res.status(500).send(error)
    }
}
});


route.get('/events/:id', async(req, res) => {

    let id = req.params.id
    if(JSON.stringify(id) == null || JSON.stringify(id) == '{}') {
        return res.status(400).send({
            message: "Event's content can not be empty"
        });
    }
    else {
    
    try {
        const item = await event.findById(id)
        res.status(200).send(item)
    }
    catch(error) {
        res.status(500).send(error)
    }
}
});


route.patch('/events/:id', async(req, res) => {

    let id = req.params.id
    if(JSON.stringify(id) == null || JSON.stringify(id) == '{}') {
        return res.status(400).send({
            message: "Event's content can not be empty"
        });
    }
    else {
    try {
        console.log(req.body)
        const updatedEvent = await event.findByIdAndUpdate(id, req.body)
    
        await updatedEvent.save()
        res.status(202).send(updatedEvent)
      } catch (err) {
        res.status(500).send(err)
      }
    }
});


route.delete('/events/:id', async (req, res) => {
    // Validate request
    let id = req.params.id
    if(JSON.stringify(id) == null || JSON.stringify(id) == '{}') {
        return res.status(400).send({
            message: "Event's content can not be empty"
        });
    }

    else {
    try {
        const affair = await event.findByIdAndDelete(id)
    
        if (!affair) { 
            res.status(404).send("No item found")
        }
        res.status(204).send(affair)
      } catch (err) {
        res.status(500).send(err)
      }
    }
});
module.exports = route


