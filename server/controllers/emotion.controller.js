const actionCtrl = {};
const Emotion = require('../models/emotion');
var in_array = require('in_array');

actionCtrl.getAll = (req, res) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Emotion.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    Emotion.find({ $or: [params] }).select('-__v').then((actions) => {
        if (actions.length > 0) {
            res.status(200).jsonp(actions);
        } else {
            res.status(404).jsonp("Not found anyone");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

actionCtrl.getOne = (req, res) => {
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

actionCtrl.create = (req, res) => {
    const emotion = new Emotion(req.body);
    emotion.save().then((emotion) => {
        res.status(200).send({ message: 'Emotion successfuly saved!' });
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

actionCtrl.update = async (req, res) => {
    const { id } = req.params;
    await Emotion.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((emotion) => {
        if (emotion) {
            res.status(200).send({ message: 'Emotion successfuly updated!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

actionCtrl.delete = (req, res) => {
    const { id } = req.params;
    Emotion.findByIdAndDelete(id).then((emotion) => {
        if (emotion) {
            res.status(200).send({ message: 'Emotion successfuly deleted!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}
module.exports = actionCtrl;