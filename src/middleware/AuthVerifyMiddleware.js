const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    let token = req.headers['token']
    jwt.verify(token, 'secretekey', function(err, data) {
        if (err) {
            res.status(401).json({
                statusCode: 401,
                hasError: true,
                errorMessage: "Invalid Token",
                content: null

            })

        } else {
            req.headers.id = data.id
            next()
        }
    })
}