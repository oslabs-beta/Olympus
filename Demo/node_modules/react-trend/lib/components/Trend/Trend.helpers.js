'use strict';

exports.__esModule = true;
exports.generateAutoDrawCss = exports.normalizeDataset = undefined;

var _math = require('../../helpers/math.helpers');

var normalizeDataset = exports.normalizeDataset = function normalizeDataset(data, _ref) {
  var minX = _ref.minX,
      maxX = _ref.maxX,
      minY = _ref.minY,
      maxY = _ref.maxY;

  // For the X axis, we want to normalize it based on its index in the array.
  // For the Y axis, we want to normalize it based on the element's value.
  //
  // X axis is easy: just evenly-space each item in the array.
  // For the Y axis, we first need to find the min and max of our array,
  // and then normalize those values between 0 and 1.
  var boundariesX = { min: 0, max: data.length - 1 };
  var boundariesY = { min: Math.min.apply(Math, data), max: Math.max.apply(Math, data) };

  var normalizedData = data.map(function (point, index) {
    return {
      x: (0, _math.normalize)({
        value: index,
        min: boundariesX.min,
        max: boundariesX.max,
        scaleMin: minX,
        scaleMax: maxX
      }),
      y: (0, _math.normalize)({
        value: point,
        min: boundariesY.min,
        max: boundariesY.max,
        scaleMin: minY,
        scaleMax: maxY
      })
    };
  });

  // According to the SVG spec, paths with a height/width of `0` can't have
  // linear gradients applied. This means that our lines are invisible when
  // the dataset is flat (eg. [0, 0, 0, 0]).
  //
  // The hacky solution is to apply a very slight offset to the first point of
  // the dataset. As ugly as it is, it's the best solution we can find (there
  // are ways within the SVG spec of changing it, but not without causing
  // breaking changes).
  if (boundariesY.min === boundariesY.max) {
    // eslint-disable-next-line no-param-reassign
    normalizedData[0].y += 0.0001;
  }

  return normalizedData;
};

var generateAutoDrawCss = exports.generateAutoDrawCss = function generateAutoDrawCss(_ref2) {
  var id = _ref2.id,
      lineLength = _ref2.lineLength,
      duration = _ref2.duration,
      easing = _ref2.easing;

  // We do the animation using the dash array/offset trick
  // https://css-tricks.com/svg-line-animation-works/
  var autodrawKeyframeAnimation = '\n    @keyframes react-trend-autodraw-' + id + ' {\n      0% {\n        stroke-dasharray: ' + lineLength + ';\n        stroke-dashoffset: ' + lineLength + '\n      }\n      100% {\n        stroke-dasharray: ' + lineLength + ';\n        stroke-dashoffset: 0;\n      }\n      100% {\n        stroke-dashoffset: \'\';\n        stroke-dasharray: \'\';\n      }\n    }\n  ';

  // One unfortunate side-effect of the auto-draw is that the line is
  // actually 1 big dash, the same length as the line itself. If the
  // line length changes (eg. radius change, new data), that dash won't
  // be the same length anymore. We can fix that by removing those
  // properties once the auto-draw is completed.
  var cleanupKeyframeAnimation = '\n    @keyframes react-trend-autodraw-cleanup-' + id + ' {\n      to {\n        stroke-dasharray: \'\';\n        stroke-dashoffset: \'\';\n      }\n    }\n  ';

  return '\n    ' + autodrawKeyframeAnimation + '\n\n    ' + cleanupKeyframeAnimation + '\n\n    #react-trend-' + id + ' {\n      animation:\n        react-trend-autodraw-' + id + ' ' + duration + 'ms ' + easing + ',\n        react-trend-autodraw-cleanup-' + id + ' 1ms ' + duration + 'ms\n      ;\n    }\n  ';
};