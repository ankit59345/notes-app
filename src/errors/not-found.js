const CustomApiError = require('./custom-error');

class NotFoundError extends CustomApiError {
    constructor(msg) {
        super(msg);
        this.statusCode = 400;
    }
}

module.exports = NotFoundError