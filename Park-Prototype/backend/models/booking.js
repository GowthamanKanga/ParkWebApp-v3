const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const bookingSchema = new Schema({

  /*  facilities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'amentityModel',
        required: true
      }],
*/
    facility: {
        type: String,
        required: true
      },

      booking_id: {
        type: Number,
        required: true,
        unique: true,
        default: Math.floor(Math.random() * 1000000) // generate a random number between 0 and 999999
    },

    user: {
        type: String,
        required: true
    },
    /*user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },*/
    booking_date: {type: Date, default: Date.now},
    amount_of_guests: {
        type: Number,
        required: true,
        default: 1
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

const bookingModel = mongoose.model("Booking", bookingSchema);

module.exports = bookingModel


