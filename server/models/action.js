const mongoose = require('mongoose');
const { Schema } = mongoose;

const actionSchema = new Schema({
    name: { type: String, required: true },
    emotions: [{type: Schema.Types.ObjectId, ref: 'Emotions'}],
    command: { type: String, required: true },
    active: { type: Boolean, default: false }
});

module.exports = mongoose.model('Action', actionSchema);