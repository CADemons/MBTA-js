/**
 * Accesses Route Query: StopsByRoute
 * @license MIT
 *
 * @author Colin Rioux
 *
 * @requires NPM:XMLHttpRequest
 * @requires NPM:array-unique
 * @requires /src/key.json
 */
"use strict";
// npm dependencies
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const Key = require('../key.json').key;
const unique = require('array-unique');
const req = new XMLHttpRequest();
