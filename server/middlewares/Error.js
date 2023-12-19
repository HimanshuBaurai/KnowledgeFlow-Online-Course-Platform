const ErrorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;//if no status code is set, set it to 500, 
    //we have to define separate ErrorHandlerClass for statusCodes,as err dont have statusCode property
    err.message = err.message || 'Internal Server Error';//if no message is set, set it to 'Internal Server Error'
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        error: err.stack//stack trace that shows where the error occured
    });
};

export default ErrorMiddleware;