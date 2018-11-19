const mongoose = require('mongoose');
const { Schema } = mongoose;

const actionsSchema = new Schema({
    begin: {type: String},
    action: {type: Schema.Types.ObjectId, ref: 'Action'},
    end : {type: String}
});

module.exports = mongoose.model('Actions', actionsSchema);