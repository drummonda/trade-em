const axios = require('axios');
module.exports = async (url, paramsWithSignature, headerConfig) => {
  try {
  	const { status } = await axios.post(url, paramsWithSignature, headerConfig)
  	console.log("if this works status will be 200, actual:", status);
  } catch (err) {
    console.error(err);
  }
}