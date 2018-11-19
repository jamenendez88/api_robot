const mongoose = require('mongoose');
const { Schema } = mongoose;

const speechesSchema = new Schema({
    begin: { type: String },
    frase: { type: String },
    audio: { type: String },
    end: { type: String }
});

module.exports = mongoose.model('Speeches', speechesSchema);