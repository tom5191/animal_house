const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnimalSchema = new Schema({
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId
  },
  breed: {
    required: false,
    type: 'String'
  },
  age: {
    required: false,
    type: Number
  },
  name: {
    required: false,
    type: String
  },
  createdAt: {
    required:true,
    type: Date,
    default: new Date
  },
  deletedAt: {
    required:false,
    type: Date
  }
})

module.export = mongoose.model('Animal', AnimalSchema);
