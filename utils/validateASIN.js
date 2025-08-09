const isValidASINFormat = (asin) => {
  return /^[A-Z0-9]{10}$/.test(asin);
};

module.exports = { isValidASINFormat };
