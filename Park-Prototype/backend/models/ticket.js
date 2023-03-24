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
    
    
    purchase_date: {
        type: Date,
        default: Date.now
    },

    totalOfTickets: {
        type: Number,
        required: true,

        
    },
    purchasedTickets: {
        type: Number,
        required: true,

    }

})


const TicketModel = mongoose.model("TicketModel",ticketSchema)
module.exports = TicketModel