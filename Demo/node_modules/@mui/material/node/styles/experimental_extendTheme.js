"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extendTheme;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _utils = require("@mui/utils");

var _system = require("@mui/system");

var _createTheme = _interopRequireDefault(require("./createTheme"));

const _excluded = ["colorSchemes"],
      _excluded2 = ["palette"];

function extendTheme(options = {}, ...args) {
  var _colorSchemesInput$li, _colorSchemesInput$da, _colorSchemesInput$li2, _colorSchemesInput$da2;

  const {
    colorSchemes: colorSchemesInput = {}
  } = options,
        input = (0, _objectWithoutPropertiesLoose2.default)(options, _excluded);

  const _createThemeWithoutVa = (0, _createTheme.default)((0, _extends2.default)({}, input, colorSchemesInput.light && {
    palette: (_colorSchemesInput$li = colorSchemesInput.light) == null ? void 0 : _colorSchemesInput$li.palette
  })),
        {
    palette: lightPalette
  } = _createThemeWithoutVa,
        muiTheme = (0, _objectWithoutPropertiesLoose2.default)(_createThemeWithoutVa, _excluded2);

  const {
    palette: darkPalette
  } = (0, _createTheme.default)({
    palette: (0, _extends2.default)({
      mode: 'dark'
    }, (_colorSchemesInput$da = colorSchemesInput.dark) == null ? void 0 : _colorSchemesInput$da.palette)
  });
  let theme = (0, _extends2.default)({}, muiTheme, {
    colorSchemes: (0, _extends2.default)({}, colorSchemesInput, {
      light: (0, _extends2.default)({}, colorSchemesInput.light, {
        palette: lightPalette,
        opacity: (0, _extends2.default)({
          placeholder: 0.42,
          inputTouchBottomLine: 0.42
        }, (_colorSchemesInput$li2 = colorSchemesInput.light) == null ? void 0 : _colorSchemesInput$li2.opacity)
      }),
      dark: (0, _extends2.default)({}, colorSchemesInput.dark, {
        palette: darkPalette,
        opacity: (0, _extends2.default)({
          placeholder: 0.5,
          inputTouchBottomLine: 0.7
        }, (_colorSchemesInput$da2 = colorSchemesInput.dark) == null ? void 0 : _colorSchemesInput$da2.opacity)
      })
    })
  });
  Object.keys(theme.colorSchemes).forEach(key => {
    const palette = theme.colorSchemes[key].palette; // attach black & white channels to common node

    if (key === 'dark') {
      palette.common.background = palette.common.background || '#000';
      palette.common.onBackground = palette.common.onBackground || '#fff';
    } else {
      palette.common.background = palette.common.background || '#fff';
      palette.common.onBackground = palette.common.onBackground || '#000';
    }

    palette.common.backgroundChannel = (0, _system.colorChannel)(palette.common.background);
    palette.common.onBackgroundChannel = (0, _system.colorChannel)(palette.common.onBackground);
    palette.dividerChannel = (0, _system.colorChannel)(palette.divider); // special token for Tooltip
    // TODO: consider adding `main`, and `light` to palette.grey to make it consistent.

    if (!palette.grey.dark) {
      palette.grey.dark = palette.grey[700];
    }

    Object.keys(palette).forEach(color => {
      const colors = palette[color]; // Color palettes: primary, secondary, error, info, success, and warning

      if (colors.main) {
        palette[color].mainChannel = (0, _system.colorChannel)(colors.main);
      }

      if (colors.light) {
        palette[color].lightChannel = (0, _system.colorChannel)(colors.light);
      }

      if (colors.dark) {
        palette[color].darkChannel = (0, _system.colorChannel)(colors.dark);
      }

      if (colors.contrastText) {
        palette[color].contrastTextChannel = (0, _system.colorChannel)(colors.contrastText);
      } // Text colors: text.primary, text.secondary


      if (colors.primary) {
        palette[color].primaryChannel = (0, _system.colorChannel)(colors.primary);
      }

      if (colors.secondary) {
        palette[color].secondaryChannel = (0, _system.colorChannel)(colors.secondary);
      }
    });
  });
  theme = args.reduce((acc, argument) => (0, _utils.deepmerge)(acc, argument), theme);
  return theme;
}