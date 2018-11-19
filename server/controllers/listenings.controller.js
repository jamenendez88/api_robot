const listeningsCtrl = {};
const Listenings = require('../models/listenings');
var in_array = require('in_array');

listeningsCtrl.getAll = (req, res) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Listenings.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    Listenings.find({ $or: [params] }).select('-__v').then((listenings) => {
        if (listenings.length > 0) {
            res.status(200).jsonp(listenings);
        } else {
            res.status(404).jsonp("Not found anyone");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}

listeningsCtrl.getOne = (req, res) => {
    const { id } = req.params;
    Listenings.findById(id).select('-__v').then((listenings) => {
        if (listenings) {
            res.status(200).jsonp(listenings);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}

listeningsCtrl.create = (req, res) => {
    const listenings = new Listenings(req.body);
    listenings.save().then((listenings) => {
        res.status(200).send({ mesage: 'Listenings succesfuly saved!' });
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}

listeningsCtrl.update = async (req, res) => {
    const { id } = req.params;
    await Listenings.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((listenings) => {
        if (listenings) {
            res.status(200).send({ mesage: 'Listenings succesfuly updated!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}

listeningsCtrl.delete = (req, res) => {
    const { id } = req.params;
    Listenings.findByIdAndDelete(id).then((listenings) => {
        if (listenings) {
            res.status(200).send({ mesage: 'Listenings succesfuly deleted!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}
module.exports = listeningsCtrl;