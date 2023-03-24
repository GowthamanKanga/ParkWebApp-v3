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
    park: {
        type: mongoose.Schema.Types.ObjectId,
    ref: 'parkModel',
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
    
    purchase_date: {
        type: Date,
        default: Date.now
    },

    totalOfTickets: {
        type: Number,
        required: true,

        validate(value) {
            if(value <= 0) {
                throw new Error("Ticket amount can not be negative")
            }
        }
    },
    purchasedTickets: {
        type: Number,
        required: true,

        validate(value) {
            if(value <= 0) {
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