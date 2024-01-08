const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        // set default
        statusCode: err.statusCode || 500,
        msg: (err.name == "Http Custom Error" ? err.message : 'Something went wrong try again later'),
    };
    console.log(err.stack || err.msg);
    return res.status(customError.statusCode).send({success: false, msg: customError.msg})
}

module.exports = errorHandlerMiddleware