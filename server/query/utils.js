/*
 * Make a query with params
 */
const getUrlWithParams = (endPoint, paramKeys, paramValues) => {
	let requestUrl = endPoint + '?';
	for(let i = 0; i < paramKeys.length; i ++) {
		if(!paramValues[i]) continue;
		if(i > 0) requestUrl += '&';
		requestUrl += `${paramKeys[i]}=${paramValues[i]}`;
	}
	return requestUrl;
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

module.exports = {
  getUrlWithParams,
  getArgs
}