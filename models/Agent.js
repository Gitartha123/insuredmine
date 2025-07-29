const mongoose = require('mongoose');
const {Schema} = mongoose;

const agentSchema = new Schema({
    agent :{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Agent',agentSchema);