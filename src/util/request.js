/**
 * To limit the amount of requests per object or file, this helper file fills in the gap. Can send requests to any part of the API, while specifying two things: the query, and the params.
 * @license MIT
 *
 * @author Colin Rioux
 *
 * @requires NPM:XMLHttpRequest
 * @requires /src/key.json
 */

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const Key = require('../key.json').key;
const req = new XMLHttpRequest();

/**
* Requests the MBTA API.
* @private
* @param {String} query The specified mbta API query.
* @param {Object} params An object whose keys follow the format: "param name": "param value".
* @returns {JSON|null} - The response from the API or null if the request was invalid.
* @example
* request("stopsbylocation", { "lat": "42.352913", "lon": "-71.064648"});
*/
exports.request = function (query, params) {
    req.open('GET', `http://realtime.mbta.com/developer/api/v2/${query.toLowerCase()}?api_key=${Key}${buildList(params)}&format=json`, false);
    req.send();
    if (req.status === 200)
        return JSON.parse(req.responseText);
    return null;
}

/**
* Builds a param list.
* @private
* @param {Object} params An object whose keys follow the format: "param name": "param value".
* @returns {String} - A param list as a String.
*/
function buildList(params) {
    let arr = [];
    for (var key in params) {
        if (params.hasOwnProperty(key) && params[key] !== undefined) {
            arr.push(`&${key}=${params[key]}`);
        }
    }
    return arr.join('');
}

//module.export = request;
