const actionLogCtrl = {};
const ActionLog = require('../models/actionlog');
var in_array = require('in_array');

actionLogCtrl.getAll = (req, res) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(ActionLog.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    ActionLog.find({ $or: [params] }).select('-__v').then((actionLogs) => {
        if (actionLogs.length > 0) {
            res.status(200).jsonp(actionLogs);
        } else {
            res.status(404).jsonp("Not found anything");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}

actionLogCtrl.getOne = (req, res) => {
    const { id } = req.params;
    ActionLog.findById(id).select('-__v').then((actionLog) => {
        if (actionLog) {
            res.status(200).jsonp(actionLog);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}

/* actionLogCtrl.create = (req, res) => {
    const ActionLog = new ActionLog(req.body);
    ActionLog.save().then((ActionLog) => {
        res.status(200).send({ mesage: 'ActionLog succesfuly saved!' });
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}*/

actionLogCtrl.update = async (req, res) => {
    const { id } = req.params;
    await ActionLog.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((ActionLog) => {
        if (ActionLog) {
            res.status(200).send({ mesage: 'ActionLog succesfuly updated!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}

actionLogCtrl.delete = (req, res) => {
    const { id } = req.params;
    ActionLog.findByIdAndUpdate(id, { $set: { active: false } }).then((actionLog) => {
        if (actionLog) {
            res.status(200).send({ mesage: 'ActionLog succesfuly deleted!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.mesage);
    });
}
module.exports = actionLogCtrl;