const listeningCtrl = {};
const Listening = require('../models/listening');
var in_array = require('in_array');

listeningCtrl.getAll = (req, res) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Listening.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    Listening.find({ $or: [params] }).select('-__v').then((listenings) => {
        if (listenings.length > 0) {
            res.status(200).jsonp(listenings);
        } else {
            res.status(404).jsonp("Not found anything");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}

listeningCtrl.getOne = (req, res) => {
    const { id } = req.params;
    Listening.findById(id).select('-__v').then((listening) => {
        if (listening) {
            res.status(200).jsonp(listening);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}

listeningCtrl.create = (req, res) => {
    const listening = new Listening(req.body);
    //the robot listen a sound and then make something
    listening.save().then(() => {
        res.status(200).send({ mesage: 'Listening succesfuly saved!' });
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}

listeningCtrl.update = async (req, res) => {
    const { id } = req.params;
    await Listening.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((listening) => {
        if (listening) {
            res.status(200).send({ mesage: 'Listening succesfuly updated!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}

listeningCtrl.delete = (req, res) => {
    const { id } = req.params;
    Listening.findByIdAndUpdate(id, { $set: { active: false } }).then((listening) => {
        if (listening) {
            res.status(200).send({ mesage: 'Listening succesfuly deleted!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}
module.exports = listeningCtrl;