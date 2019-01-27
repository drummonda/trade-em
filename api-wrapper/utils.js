const CryptoJS = require('crypto-js');
const axios = require('axios');
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
 * Make a request body based off an object input
 */
const generateBody = (args, timestamp=false) => {
  let params = "";
  args = timestamp ? {...args, timestamp: Date.now() } : args;
  Object.keys(args).forEach(key => {
    params += `${key}=${args[key]}&`
  })
  params = params.slice(0, -1);
  const signature = generateSig(params);
  return `${params}&signature=${signature}`;
}

/*
 * Make a request url based off an object input
 */
const generateUrl = (url, args, timestamp=false) => {
  let params = "";
  args = timestamp ? {...args, timestamp: Date.now() } : args;
  Object.keys(args).forEach(key => {
    params += `${key}=${args[key]}&`
  })
  params = params.slice(0, -1);
  const signature = generateSig(params);
  return `${url}?${params}&signature=${signature}`;
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
 * Generate an api config
 */
const generateConfig = (url, method, params=null, headers={}, auth=false) => {
  switch(method) {
    case 'get':
      return { 
                method, 
                url: params ? generateUrl(url, params, true) : url, // don't do anything to url if no params
                headers 
              };

    case 'post':
      return { 
                method, 
                url, 
                data: generateBody(params, auth), 
                headers 
              };

    case 'put':
      return {};

    case 'delete':
      return { 
                method, 
                url, 
                data: generateBody(params, auth), 
                headers 
              };
  }
}


/*
 * Generate an api request by params
 */
const request = async (url, method, params=null, headers={}, auth=false) => { 
  try {
    const { data } = await axios(generateConfig(url, method, params, headers, auth));
    console.log("data", data);
  } catch (err) {
    console.error(err)
  }
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
  generateBody,
  generateSig,
  generateConfig,
  request,
  getArgs
}