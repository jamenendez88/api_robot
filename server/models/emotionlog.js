const mongoose = require('mongoose');
const { Schema } = mongoose;

const emotionLogSchema = new Schema({
    begin: { type : Date, default: Date.now },
    emotion: { type: Schema.Types.ObjectId, ref: 'Emotion' },
    end: { type : Date, default: Date.now },
    active : { type : Boolean, default: true },
});

module.exports = mongoose.model('EmotionLog', emotionLogSchema);