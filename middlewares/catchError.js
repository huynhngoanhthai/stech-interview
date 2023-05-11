const catchError = (err, req, res, next) => {
    console.log(JSON.stringify(err, null, 2));
  
    if (err.code === 11000) {
      err.statusCode = 400;
      const key = Object.keys(err.keyValue);
      err.message = `${key} is supplicated`;
    }
    
    if (err.kind === "ObjectId") {
      err.statusCode = 400;
      err.message = "bad id";
    }
    if(err.code  === "LIMIT_FILE_SIZE"){
      err.statusCode = 400;
    }
    res.status(err.statusCode?err.statusCode:500).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
    });
    
  };
  module.exports = catchError;