"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var range = exports.range = function range(to) {
  return [].concat(Array(to).keys());
};

var pick = exports.pick = function pick(obj, keys) {
  return keys.reduce(function (acc, key) {
    var _extends2;

    return _extends({}, acc, (_extends2 = {}, _extends2[key] = obj[key], _extends2));
  }, {});
};

var omit = exports.omit = function omit(obj, keys) {
  return Object.keys(obj).reduce(function (acc, key) {
    var _extends3;

    if (keys.indexOf(key) !== -1) {
      return acc;
    }

    return _extends({}, acc, (_extends3 = {}, _extends3[key] = obj[key], _extends3));
  }, {});
};