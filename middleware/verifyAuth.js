const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        const access_token = req.headers.authorization
        if (!access_token) {
            throw Error('access token not found')
        }
        const decoded = jwt.verify(access_token, 'secret@123')

        req.email = decoded.email
        next()

    } catch (error) {
        return res.status(401).json({
            message: 'unauthorized message',
            error: error.message
        })
    }
}