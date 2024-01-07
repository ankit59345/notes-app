const CustomApiError = require('./custom-error');

class BadRequestError extends CustomApiError {
    constructor(msg) {
        super(msg);
        this.statusCode = 400;
    }
}

module.exports = BadRequestError