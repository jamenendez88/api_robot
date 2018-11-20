const actionCtrl = {};
const Action = require('../models/action');
const ActionLog = require('../models/actionlog');
var in_array = require('in_array');

actionCtrl.getAll = (req, res) => {
    var params = {};
    for (key in req.query) {
        // check if the params are corrects for find
        if (in_array(key, Object.keys(Action.schema.paths))) {
            req.query[key] !== "" ? params[key] = new RegExp(req.query[key], "i") : null;
        }
    }
    params['active'] = true;
    Action.find({ $or: [params] }).select('-__v').then((actions) => {
        if (actions.length > 0) {
            res.status(200).jsonp(actions);
        } else {
            res.status(404).jsonp("Not found anything");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

actionCtrl.getOne = (req, res) => {
    const { id } = req.params;
    Action.findById(id).select('-__v').then((action) => {
        if (action) {
            res.status(200).jsonp(action);
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

actionCtrl.create = (req, res) => {
    const action = new Action(req.body);
    action.save().then((action) => {
        res.status(200).send({ message: 'Action successfuly saved!' });
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

actionCtrl.update = async (req, res) => {
    const { id } = req.params;
    await Action.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((action) => {
        if (action) {
            res.status(200).send({ message: 'Action successfuly updated!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

actionCtrl.delete = (req, res) => {
    const { id } = req.params;
    Action.findByIdAndUpdate(id, { $set: { active: false } }).then((action) => {
        if (action) {
            res.status(200).send({ message: 'Action successfuly deleted!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

actionCtrl.perform = (req, res) => {
    const { id } = req.params;
    Action.findById(id).then((action) => {
        if (action) {
            //The robot performs an atomic action
            var begin = new Date();
            var end = new Date();
            end.setSeconds(end.getSeconds() + 10);
            var log = new ActionLog({
                begin: begin,
                action: action,
                end: end
            });
            log.save().then(() => {
                res.status(200).send({ message: 'Action successfuly made!' });
            });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}
module.exports = actionCtrl;