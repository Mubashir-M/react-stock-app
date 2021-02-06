const mongoose = require('mongoose')
const Schema =  mongoose.Schema


// creating a new schema

const ItemSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})


module.exports = Item = mongoose.model('Item', ItemSchema)