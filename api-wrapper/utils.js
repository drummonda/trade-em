const CryptoJS = require('crypto-js');
const axios = require('axios');

/*
 * Hash query params
 */
const generateSig = params => CryptoJS.HmacSHA256(params, process.env.BINANCE_SECRET).toString();

/*
 * Make a request body based off an object input
 */
const generateBody = (args, auth) => {
  let params = "";
  args = auth ? {...args, timestamp: Date.now() } : args;
  Object.keys(args).forEach(key => {
    params += `${key}=${args[key]}&`
  })
  params = params.slice(0, -1);
  if(auth) {
    const signature = generateSig(params);
    return `${params}&signature=${signature}`;
  } else {
    return params;
  }
}

/*
 * Make a request url based off an object input
 */
const generateUrlWithSig = (url, args, timestamp=false) => {
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
 * Make a req url with params
 */
const generateUrlWithParams = (url, params) => {
  let requestUrl = `${url}?`;
  Object.keys(params).forEach((key, idx) => {
    if(idx) requestUrl += '&';
    requestUrl += `${key}=${params[key]}`
  })
  return requestUrl;
}

/*
 * Generate a url
 */
const generateUrl = (url, params=false, auth=false) => {
  if(auth) {
    return generateUrlWithSig(url, params, true);
  } else if(params) {
    return generateUrlWithParams(url, params)
  } else {
    return url;
  }
}


/*
 * Generate an api config
 */
const generateConfig = (url, method, params=false, headers={}, auth=false) => {
  switch(method) {
    case 'get':
      return { 
                method, 
                url: generateUrl(url, params, auth), // don't do anything to url if no params
                headers
              };

    default:
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
    const { data, status } = await axios(generateConfig(url, method, params, headers, auth));
    console.log("status was: ", status, "and got some data..?", data);
    return data;
  } catch (err) {
    console.error(err.message);
  }
}


module.exports = {
  generateUrl,
  generateUrlWithSig,
  generateSig,
  generateConfig,
  request,
}