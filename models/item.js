import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
  title: String,
  content: String,
  image:String
})

module.exports = mongoose.models.item || mongoose.model('item', itemSchema)