const BadRequestError = require('./bad-request')
const UnauthenticatedError = require('./unauthenticated')
const UnauthorizedError = require('./unauthorized')
const NotFoundError = require('./not-found')
const CustomApiError = require('./custom-error')

module.exports = {
    BadRequestError,
    UnauthenticatedError,
    UnauthorizedError,
    NotFoundError,
    CustomApiError
}