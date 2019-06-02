const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Idea = new Schema({
  title: { type: String },
  textBox1: { type: String },
  textBox2: { type: String },
  textBox3: { type: String },
  textBox4: { type: String },
  textBox5: { type: String },
  textBox6: { type: String }
});

module.exports = mongoose.model('Idea', Idea);