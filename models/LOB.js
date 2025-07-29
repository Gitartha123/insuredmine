const mongoose = require('mongoose');
const {Schema} = mongoose;

const lobSchema = new Schema({
    categoryName :{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('LOB',lobSchema);