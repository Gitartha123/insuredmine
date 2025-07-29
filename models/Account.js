const mongoose = require('mongoose');
const {Schema} = mongoose;

const accountSchema = new Schema({
    accountName :{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Account',accountSchema);