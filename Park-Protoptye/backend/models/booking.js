const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const bookingSchema = new Schema({

    bookingNumber: String,
    facility: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'amenitiy',
        required: true
    }],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    booking_date: {type: Date, default: Date.now},
    amount_of_guests: {
        type: Number,
        required: true,

        validate(value) {
            if(value < 0) {
                throw new Error("Can not be negative number")
            }
        },
        default: 0
    },

    start_time: {
        type: String,
        required: true,
        unique: true
    },
    end_time: {
        type: String,
        required: true,
        unique: true
    }

})

const bookingModel = mongoose.model("bookingModel", bookingSchema);

module.exports = bookingModel