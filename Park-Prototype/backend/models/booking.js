const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const bookingSchema = new Schema({

    bookingNumber: String,
    facilities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'facilityModel'
      }],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    booking_date: {type: Date, default: Date.now},
    amount_of_guests: {
        type: Number,
        required: true,

        validate(value) {
            if(value <= 0) {
                throw new Error("Can not be negative or zero")
            }
        },
        default: 1
    },

    start_time: {
        type: String,
        required: true,
        // unique: true
    },
    end_time: {
        type: String,
        required: true,
        // unique: true
    }

})

const bookingModel = mongoose.model("Booking", bookingSchema);

module.exports = bookingModel


