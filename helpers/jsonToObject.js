let jsonToObject = string => {
  try {
    obj = JSON.parse(string);
    return obj;
  } catch (e) {
    return {};
  }
};
module.exports = jsonToObject;
