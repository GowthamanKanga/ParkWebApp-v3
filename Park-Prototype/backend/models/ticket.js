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
    }
})


const TicketModel = mongoose.model("TicketModel",ticketSchema)
module.exports = TicketModel