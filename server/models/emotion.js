const mongoose = require('mongoose');
const { Schema } = mongoose;

const emotionSchema = new Schema({
    name: { type: String, required: true },
    actions: [{type: Schema.Types.ObjectId, ref: 'Action'}],
    command: { type: String, required: true },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Emotion', emotionSchema);