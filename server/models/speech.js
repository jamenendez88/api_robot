const mongoose = require('mongoose');
const { Schema } = mongoose;

const speechSchema = new Schema({
    begin: { type : Date, default: Date.now },
    frase: { type: String },
    audio: { type: String },
    end: { type : Date, default: Date.now },
    active : { type : Boolean, default: true },
});

module.exports = mongoose.model('Speech', speechSchema);