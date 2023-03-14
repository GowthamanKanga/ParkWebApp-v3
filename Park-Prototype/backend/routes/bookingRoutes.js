const express = require("express");
const route = express.Router();
const Booking = require("../models/booking");
const { verifytoken } = require("./func");



route.post('/booking/add', /*verifytoken,*/ async(req, res) => {

    const newBooking = req.body;
    console.log(newBooking)
    if(JSON.stringify(newBooking) == null || JSON.stringify(newBooking) == '{}') {
        return res.status(400).send({
            message: "Booking content can not be empty"
        });
    }
    else {

    try {
        const booking = new Booking(newBooking)
        await booking.save()
        res.status(201).send(booking)
    }
    catch(error) {
        res.status(500).send(error)
        console.log(error)
    }
}
});



route.get("/bookings", /*verifytoken,*/ async (req, res) => {
  try {
    const bookings = await order.find({});
    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).send(error);
  }
});

route.get("/bookings/:id", /*verifytoken,*/ async (req, res) => {
  // Validate request
  let id = req.params.id;
  if (JSON.stringify(id) == null || JSON.stringify(id) == "{}") {
    return res.status(400).send({
      message: "Location content can not be empty",
    });
  } else {
    try {
      const booking = await order.findById(id);
      res.status(200).send(booking);
    } catch (error) {
      res.status(500).send(error);
    }
  }
});

route.patch("/bookings/:id", /*verifytoken,*/ async (req, res) => {
  let id = req.params.id;
  if (JSON.stringify(id) == null || JSON.stringify(id) == "{}") {
    return res.status(400).send({
      message: "Location's content can not be empty",
    });
  } else {
    try {
      console.log(req.body);
      const updatedBooking = await order.findByIdAndUpdate(id, req.body);

      await updatedBooking.save();
      res.status(202).send(updatedBooking);
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

route.delete("/bookings/:id", /*verifytoken,*/ async (req, res) => {
  let id = req.params.id;
  if (JSON.stringify(id) == null || JSON.stringify(id) == "{}") {
    return res.status(400).send({
      message: "Location's content can not be empty",
    });
  } else {
    try {
      const booking = await order.findByIdAndDelete(id);

      if (!location) {
        res.status(404).send("No item found");
      }
      res.status(204).send(booking);
    } catch (err) {
      res.status(500).send(err);
    }
  }
});
module.exports = route;
