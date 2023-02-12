const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'eventModel',
        required: true
    },

    price: {
        type: Number,
        required: true,

        validate(value) {
            if(value < 0.0) {
                throw new Error("Price can not be negative")
            }
        }
    },
    ticket_id: {
        type: String,
        required: true
    },

    purchase_date: {
        type: Date,
        default: Date.now
    },

    ticket_amount: {
        type: Number,
        required: true,

        validate(value) {
            if(value < 0) {
                throw new Error("Ticket amount can not be negative")
            }
        }
    }

})

const TicketModel = mongoose.model("TicketModel",ticketSchema)
module.exports = TicketModel