const actionsCtrl = {};
const Actions = require('../models/actions');
var in_array = require('in_array');

actionsCtrl.getAll = (req, res) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Actions.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    Actions.find({ $or: [params] }).select('-__v').then((actions) => {
        if (actions.length > 0) {
            res.status(200).jsonp(actions);
        } else {
            res.status(404).jsonp("Not found anyone");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}

actionsCtrl.getOne = (req, res) => {
    const { id } = req.params;
    Actions.findById(id).select('-__v').then((actions) => {
        if (actions) {
            res.status(200).jsonp(actions);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}

actionsCtrl.create = (req, res) => {
    const actions = new Actions(req.body);
    actions.save().then((actions) => {
        res.status(200).send({ mesage: 'Actions succesfuly saved!' });
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}

actionsCtrl.update = async (req, res) => {
    const { id } = req.params;
    await Actions.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((actions) => {
        if (actions) {
            res.status(200).send({ mesage: 'Actions succesfuly updated!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}

actionsCtrl.delete = (req, res) => {
    const { id } = req.params;
    Actions.findByIdAndDelete(id).then((actions) => {
        if (actions) {
            res.status(200).send({ mesage: 'Actions succesfuly deleted!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}
module.exports = actionsCtrl;