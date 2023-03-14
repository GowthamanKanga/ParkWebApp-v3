const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    event: {
        type: String,
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

    totalOfTickets: {
        type: Number,
        required: true,

        validate(value) {
            if(value < 0) {
                throw new Error("Ticket amount can not be negative")
            }
        }
    },
    purchasedTickets: {
        type: Number,
        required: true,

        validate(value) {
            if(value < 0) {
                throw new Error("Ticket amount can not be negative")
            }
        }
    }

})
ticketSchema.virtual("availableTickets").get(function() {
    return this.totalOfTickets - this.purchasedTickets;
})

const TicketModel = mongoose.model("TicketModel",ticketSchema)
module.exports = TicketModel