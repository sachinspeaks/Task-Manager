class CustomAPIError extends Error {
    constructor(message, statuscode) {
        super(message)
        this.statusCode = statuscode
    }
}

const createCustomError = (message, statusCode) => {
    return new CustomAPIError(message, statusCode)
}

module.exports = { createCustomError, CustomAPIError }