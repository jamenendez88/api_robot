const emotionCtrl = {};
const Emotion = require('../models/emotion');
const EmotionLog = require('../models/emotionlog');
var in_array = require('in_array');

emotionCtrl.getAll = (req, res) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Emotion.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    Emotion.find({ $or: [params] }).select('-__v').then((emotions) => {
        if (emotions.length > 0) {
            res.status(200).jsonp(emotions);
        } else {
            res.status(404).jsonp("Not found anything");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

emotionCtrl.getOne = (req, res) => {
    const { id } = req.params;
    Emotion.findById(id).select('-__v').then((emotion) => {
        if (emotion) {
            res.status(200).jsonp(emotion);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

emotionCtrl.create = (req, res) => {
    const emotion = new Emotion(req.body);
    emotion.save().then(() => {
        res.status(200).send({ message: 'Emotion successfuly saved!' });
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

emotionCtrl.update = (req, res) => {
    const { id } = req.params;
    Emotion.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((emotion) => {
        if (emotion) {
            res.status(200).send({ message: 'Emotion successfuly updated!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

emotionCtrl.delete = (req, res) => {
    const { id } = req.params;
    Emotion.findByIdAndUpdate(id, { $set: { active: false } }).then((emotion) => {
        if (emotion) {
            res.status(200).send({ message: 'Emotion successfuly deleted!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

emotionCtrl.perform = (req, res) => {
    const { id } = req.params;
    Emotion.findById(id).then((emotion) => {
        if (emotion) {
            //The robot performs an emotion (an array of atomic emotions)
            var begin = new Date();
            var end = new Date();
            end.setSeconds(end.getSeconds() + 10);
            var log = new EmotionLog({
                begin: begin,
                emotion: emotion,
                end: end
            });
            log.save().then(() => {
                res.status(200).send({ message: 'Emotion successfuly made!' });
            });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}
module.exports = emotionCtrl;