const emotionLogCtrl = {};
const EmotionLog = require('../models/emotionlog');
var in_array = require('in_array');

emotionLogCtrl.getAll = (req, res) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(EmotionLog.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    EmotionLog.find({ $or: [params] }).select('-__v').then((emotionlogs) => {
        if (emotionlogs.length > 0) {
            res.status(200).jsonp(emotionlogs);
        } else {
            res.status(404).jsonp("Not found anything");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

emotionLogCtrl.getOne = (req, res) => {
    const { id } = req.params;
    EmotionLog.findById(id).select('-__v').then((emotionlog) => {
        if (emotionlog) {
            res.status(200).jsonp(emotionlog);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

/* emotionLogCtrl.create = (req, res) => {
    const emotionlog = new EmotionLog(req.body);
    emotionlog.save().then(() => {
        res.status(200).send({ message: 'EmotionLog successfuly saved!' });
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
} */

emotionLogCtrl.update = (req, res) => {
    const { id } = req.params;
    EmotionLog.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((emotionlog) => {
        if (emotionlog) {
            res.status(200).send({ message: 'EmotionLog successfuly updated!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

emotionLogCtrl.delete = (req, res) => {
    const { id } = req.params;
    EmotionLog.findByIdAndUpdate(id, { $set: { active: false } }).then((emotionlog) => {
        if (emotionlog) {
            res.status(200).send({ message: 'EmotionLog successfuly deleted!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}
module.exports = emotionLogCtrl;