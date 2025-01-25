module.exports = (res, { code = 200, message, data } = {}) => {
    if (!isValidHttpStatusCode(code)) {
      code = 500; 
    }
  
    console.log(data ?? "");
  
    return res.status(code).json({
      data,
      message,
    });
  };
  
  function isValidHttpStatusCode(code) {
    return Number.isInteger(code) && code >= 100 && code <= 599;
  }