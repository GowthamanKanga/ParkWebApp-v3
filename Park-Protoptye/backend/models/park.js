const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const parkSchema = new Schema({

    parkName: {
        type: String,
        required: true 
    },
    description: {
       type: String 
    },
    clients : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
        required: true
    }],
    facilities : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'facilityModel',
        required: true
    }],
    image: {
        type: String,
        required: true
    }

})

const parkModel = mongoose.model("parkModel", parkSchema);

module.exports = parkModel