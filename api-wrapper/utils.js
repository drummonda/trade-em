const CryptoJS = require('crypto-js');

/*
 * Make a query with params
 */
const generateParams = (paramKeys, paramValues) => {
	let params = {};
	for(let i = 0; i < paramKeys.length; i ++) {
		if(!paramValues[i]) continue;
		params[paramKeys[i]] = paramValues[i];
	}
	return { params };
}

/*
 * Make a req url with params
 */
const generateUrl = (paramKeys, paramValues) => {
  let requestUrl = '';
  for(let i = 0; i < paramKeys.length; i ++) {
    if(!paramValues[i]) continue;
    if(i) requestUrl += '&';
    requestUrl += `${paramKeys[i]}=${paramValues[i]}`
  }
  return requestUrl;
}

/*
 * Make a req url with params and a signature
 */
const generateUrlWithSig = (url, func, paramValues) => {
  const params = generateUrl(getArgs(func), paramValues);
  const signature = generateSig(params);
  return `${url}?${params}&signature=${signature}`;
}

/*
 * Make a req body with params and a signature
 */
const generateBodyWithSig = (func, paramValues) => {
  const params = generateUrl(getArgs(func), paramValues);
  const signature = generateSig(params);
  return `${params}&signature=${signature}`;
}

/*
 * Get the arguments of a function dynamically
 */
const getArgs = func => {
  // First match everything inside the function argument parens.
  const args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
  // Split the arguments string into an array comma delimited.
  return args.split(',').map(arg => {
    const noDefault = arg.split("=")[0];
    // Ensure no inline comments are parsed and trim the whitespace.
    return noDefault.replace(/\/\*.*\*\//, '').trim();
  }).filter(function(arg) {
    // Ensure no undefined values are added.
    return arg;
  });
}


/*
 * Hash query params
 */
const generateSig = params => CryptoJS.HmacSHA256(params, process.env.BINANCE_SECRET).toString();

module.exports = {
  generateParams,
  generateUrl,
  generateUrlWithSig,
  generateBodyWithSig,
  generateSig,
  getArgs
}