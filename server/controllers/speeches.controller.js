const speechesCtrl = {};
const Speeches = require('../models/speeches');
var in_array = require('in_array');

speechesCtrl.getAll = (req, res) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Speeches.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    Speeches.find({ $or: [params] }).select('-__v').then((speeches) => {
        if (speeches.length > 0) {
            res.status(200).jsonp(speeches);
        } else {
            res.status(404).jsonp("Not found anyone");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}

speechesCtrl.getOne = (req, res) => {
    const { id } = req.params;
    Speeches.findById(id).select('-__v').then((speeches) => {
        if (speeches) {
            res.status(200).jsonp(speeches);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}

speechesCtrl.create = (req, res) => {
    const speeches = new Speeches(req.body);
    speeches.save().then((speeches) => {
        res.status(200).send({ mesage: 'Speeches succesfuly saved!' });
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}

speechesCtrl.update = async (req, res) => {
    const { id } = req.params;
    await Speeches.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((speeches) => {
        if (speeches) {
            res.status(200).send({ mesage: 'Speeches succesfuly updated!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}

speechesCtrl.delete = (req, res) => {
    const { id } = req.params;
    Speeches.findByIdAndDelete(id).then((speeches) => {
        if (speeches) {
            res.status(200).send({ mesage: 'Speeches succesfuly deleted!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}
module.exports = speechesCtrl;