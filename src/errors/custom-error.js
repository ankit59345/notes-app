class CustomApiError extends Error {
    constructor(message) {
        super(message);
        this.name = "Http Custom Error"
    }
}

module.exports = CustomApiError