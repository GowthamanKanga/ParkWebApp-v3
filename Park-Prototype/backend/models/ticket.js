const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    number_Of_Tickets: {
        type: Number,
        required: true
    },
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