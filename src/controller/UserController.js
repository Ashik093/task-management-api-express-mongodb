const UserModel = require('../model/UserModel')
const jwt = require('jsonwebtoken')
exports.Registration = (req, res) => {
    UserModel.create(req.body, (err, data) => {
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
exports.Login = (req, res) => {
    UserModel.aggregate([
        { $match: req.body },
        { $project: { _id: 1, firstName: 1, lastName: 1, mobile: 1, image: 1 } },

    ], (err, data) => {
        if (err) {
            res.status(401).json({
                hasError: true,
                status: 401,
                message: err,
                data: null
            })
        } else {
            if (data.length > 0) {
                const token = jwt.sign({ id: data[0]._id },
                    'secretekey', {
                        expiresIn: "24h",
                    }
                );
                let accessToken = {
                    token: token
                }

                res.status(200).json({
                    statusCode: 200,
                    hasError: false,
                    errorMessage: null,
                    content: Object.assign(accessToken, data[0])

                })
            } else {
                res.status(401).json({
                    hasError: true,
                    status: 401,
                    message: "Enter valid credential",
                    data: null
                })
            }
        }

    })
}

exports.UpdateProfile = (req, res) => {
    UserModel.updateOne({ id: req.headers['id'] }, req.body, (err, data) => {
        if (err) {
            res.status(400).json({
                statusCode: 400,
                hasError: true,
                errorMessage: err,
                content: null

            })
        } else {
            res.status(200).json({
                statusCode: 200,
                hasError: true,
                errorMessage: null,
                content: data

            })
        }
    })

}