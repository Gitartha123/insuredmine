const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
  policyNumber: {
    type: String,
    required: true,
    maxlength: 50
  },
  policyStartDate: {
    type: Date,
    required: true
  },
  policyEndDate: {
    type: Date,
    required: true
  },
  policyCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LOB',
    required: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carrier',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Policy', PolicySchema);
