export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'development' 
    ? err.message 
    : status >= 500 ? 'Internal Server Error' : err.message;

  res.status(status).json({
    error: { status, message, ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) }
  });
};