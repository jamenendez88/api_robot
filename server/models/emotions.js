const mongoose = require('mongoose');
const { Schema } = mongoose;

const emotionsSchema = new Schema({
    begin: { type: String },
    emotion: { type: Schema.Types.ObjectId, ref: 'Emotion' },
    end: { type: String }
});

module.exports = mongoose.model('Speeches', emotionsSchema);