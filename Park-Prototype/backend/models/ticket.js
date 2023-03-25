const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
  
    event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'eventModel',
    required: true
    },
    purchase_date: {
        type: Date,
        default: Date.now
    },

    bookedTickets: {
        type: Number,
        required: true,

       
    ticket_id: {
        type: Number,
        required: true,
        unique: true,
        default: Math.floor(Math.random() * 1000000) // generate a random number between 0 and 999999
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ticketModel'
    }
})


const TicketModel = mongoose.model("TicketModel",ticketSchema)
module.exports = TicketModel