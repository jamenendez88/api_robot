const mongoose = require('mongoose');
const { Schema } = mongoose;

const actionLogSchema = new Schema({
    begin: { type: Date, default: Date.now },
    action: { type: Schema.Types.ObjectId, ref: 'Action' },
    end: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('ActionLog', actionLogSchema);