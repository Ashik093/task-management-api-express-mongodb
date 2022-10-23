const TaskModel = require('../model/TaskModel')
const ObjectId = require('mongoose').Types.ObjectId


exports.Create = (req, res) => {
    let reqBody = req.body
    reqBody.userId = req.headers.id
    TaskModel.create(reqBody, (err, data) => {
        if (err) {
            res.status(400).json({
                hasError: true,
                status: 400,
                message: err,
                data: null
            })
        } else {
            res.status(200).json({
                hasError: false,
                status: 200,
                message: "Success",
                data: data
            })
        }
    })
}
exports.GetTask = (req, res) => {
    TaskModel.aggregate([{
            $match: {
                userId: ObjectId(req.headers.id)
            }
        },
        {
            $project: {
                _id: 1,
                title: 1,
                description: 1,
                status: 1,
                userId: 1,
                createdAt: {
                    $dateToString: {
                        date: "$createdAt",
                        format: "%d-%m-%Y"
                    }
                }
            }

        }
    ], (err, data) => {
        if (err) {
            res.status(400).json({
                hasError: true,
                status: 400,
                message: err,
                data: null
            })
        } else {
            res.status(200).json({
                hasError: false,
                status: 200,
                message: "Success",
                data: data
            })
        }
    })
}
exports.Update = (req, res) => {
    let reqBody = req.body

    TaskModel.updateOne({ _id: reqBody._id }, { status: 'Active' }, (err, data) => {
        if (err) {
            res.status(400).json({
                hasError: true,
                status: 400,
                message: err,
                data: null
            })
        } else {
            res.status(200).json({
                hasError: false,
                status: 200,
                message: "Success",
                data: data
            })
        }
    })
}
exports.Delete = (req, res) => {
    TaskModel.deleteOne({ _id: req.body._id }, (err, data) => {
        if (err) {
            res.status(400).json({
                hasError: true,
                status: 400,
                message: err,
                data: null
            })
        } else {
            res.status(200).json({
                hasError: false,
                status: 200,
                message: "Success",
                data: data
            })
        }
    })
}
exports.GetTaskByStatus = (req, res) => {
    TaskModel.aggregate([{
        $match: { status: req.params.status, userId: ObjectId(req.headers.id) },
    }, {
        $project: {
            _id: 1,
            title: 1,
            description: 1,
            status: 1,
            createdAt: {
                $dateToString: {
                    date: "$createdAt",
                    format: "%d-%m-%Y"
                }
            }
        }

    }], (err, data) => {
        if (err) {
            res.status(400).json({
                hasError: true,
                status: 400,
                message: err,
                data: null
            })
        } else {
            res.status(200).json({
                hasError: false,
                status: 200,
                message: "Success",
                data: data
            })
        }
    })
}
exports.GetTaskCountByStatus = (req, res) => {
    TaskModel.aggregate([{
        $match: { userId: ObjectId(req.headers.id) },
    }, {
        $group: { _id: "$status", sum: { $count: {} } }

    }], (err, data) => {
        if (err) {
            res.status(400).json({
                hasError: true,
                status: 400,
                message: err,
                data: null
            })
        } else {
            res.status(200).json({
                hasError: false,
                status: 200,
                message: "Success",
                data: data
            })
        }
    })
}