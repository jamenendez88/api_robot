const mongoose = require('mongoose');
const { Schema } = mongoose;

const listeningsSchema = new Schema({
    begin: { type: String },
    frase: { type: String },
    audio: { type: String },
    end: { type: String }
});

module.exports = mongoose.model('Listenings', listeningsSchema);