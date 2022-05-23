"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useColorScheme = exports.getInitColorSchemeScript = exports.Experimental_CssVarsProvider = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _system = require("@mui/system");

var _experimental_extendTheme = _interopRequireDefault(require("./experimental_extendTheme"));

var _createTypography = _interopRequireDefault(require("./createTypography"));

/* eslint-disable @typescript-eslint/naming-convention */
const defaultTheme = (0, _experimental_extendTheme.default)();
const {
  CssVarsProvider: Experimental_CssVarsProvider,
  useColorScheme,
  getInitColorSchemeScript
} = (0, _system.unstable_createCssVarsProvider)({
  theme: defaultTheme,
  defaultColorScheme: {
    light: 'light',
    dark: 'dark'
  },
  prefix: 'md',
  resolveTheme: theme => {
    const newTheme = (0, _extends2.default)({}, theme, {
      typography: (0, _createTypography.default)(theme.palette, theme.typography)
    });
    return newTheme;
  },
  shouldSkipGeneratingVar: keys => !!keys[0].match(/(typography|mixins|breakpoints|direction|transitions)/)
});
exports.getInitColorSchemeScript = getInitColorSchemeScript;
exports.useColorScheme = useColorScheme;
exports.Experimental_CssVarsProvider = Experimental_CssVarsProvider;