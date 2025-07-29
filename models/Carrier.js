const mongoose = require('mongoose');
const {Schema} = mongoose;

const carrierSchema = new Schema({
    companyName :{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Carrier',carrierSchema);