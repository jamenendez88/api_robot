const speechCtrl = {};
const Speech = require('../models/speech');
var in_array = require('in_array');

speechCtrl.getAll = (req, res) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Speech.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    Speech.find({ $or: [params] }).select('-__v').then((speeches) => {
        if (speeches.length > 0) {
            res.status(200).jsonp(speeches);
        } else {
            res.status(404).jsonp("Not found anything");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}

speechCtrl.getOne = (req, res) => {
    const { id } = req.params;
    Speech.findById(id).select('-__v').then((speech) => {
        if (speech) {
            res.status(200).jsonp(speech);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}

speechCtrl.create = (req, res) => {
    const speech = new Speech(req.body);
    //The robot say something
    speech.save().then((speeches) => {
        res.status(200).send({ mesage: 'Speech succesfuly saved!' });
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}

speechCtrl.update = async (req, res) => {
    const { id } = req.params;
    await Speech.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((speech) => {
        if (speech) {
            res.status(200).send({ mesage: 'Speech succesfuly updated!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}

speechCtrl.delete = (req, res) => {
    const { id } = req.params;
    Speech.findByIdAndUpdate(id, { $set: { active: false } }).then((speech) => {
        if (speech) {
            res.status(200).send({ mesage: 'Speech succesfuly deleted!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}
module.exports = speechCtrl;