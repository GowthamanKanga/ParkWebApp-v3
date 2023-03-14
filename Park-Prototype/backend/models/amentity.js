const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const amentitySchema = new Schema({

    amentityName: {
        
        type: String,
        required: true},
    amentityDescription: String,

    image: {type: String, required: true},

    /*isAvailable: {
        type: Boolean,
        required: true,
        default: true
    },
    */
    totalAmount: {
        type: Number,
        required: true,
        validate(value) {
          if(value < 0) {
            throw new Error("Can not be negative number")
          }  
        },
        default: 0
    },
    occupiedAmount: {
        type: Number,
        required: true,

        validate(value) {
            if(value < 0) {
                throw new Error("Can not be negative number")
            }
        },
        default: 0
    },
    

})

amentitySchema.virtual("availiableAmount").get(function() {
    return this.totalAmount - this.occupiedAmount;
})

const amentityModel = mongoose.model("amentityModel", amentitySchema);

module.exports = amentityModel