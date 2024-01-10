class CustomApiError extends Error {
    constructor(message, status) {
        super(message);
        this.name = "Http Custom Error"
        if( status ) this.statusCode = status
    }
}

module.exports = CustomApiError