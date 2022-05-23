import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { deepmerge } from '@mui/utils';
import { colorChannel } from '@mui/system';
import createThemeWithoutVars from './createTheme';
export default function extendTheme() {
  var _colorSchemesInput$li, _colorSchemesInput$da, _colorSchemesInput$li2, _colorSchemesInput$da2;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _options$colorSchemes = options.colorSchemes,
      colorSchemesInput = _options$colorSchemes === void 0 ? {} : _options$colorSchemes,
      input = _objectWithoutProperties(options, ["colorSchemes"]);

  var _createThemeWithoutVa = createThemeWithoutVars(_extends({}, input, colorSchemesInput.light && {
    palette: (_colorSchemesInput$li = colorSchemesInput.light) == null ? void 0 : _colorSchemesInput$li.palette
  })),
      lightPalette = _createThemeWithoutVa.palette,
      muiTheme = _objectWithoutProperties(_createThemeWithoutVa, ["palette"]);

  var _createThemeWithoutVa2 = createThemeWithoutVars({
    palette: _extends({
      mode: 'dark'
    }, (_colorSchemesInput$da = colorSchemesInput.dark) == null ? void 0 : _colorSchemesInput$da.palette)
  }),
      darkPalette = _createThemeWithoutVa2.palette;

  var theme = _extends({}, muiTheme, {
    colorSchemes: _extends({}, colorSchemesInput, {
      light: _extends({}, colorSchemesInput.light, {
        palette: lightPalette,
        opacity: _extends({
          placeholder: 0.42,
          inputTouchBottomLine: 0.42
        }, (_colorSchemesInput$li2 = colorSchemesInput.light) == null ? void 0 : _colorSchemesInput$li2.opacity)
      }),
      dark: _extends({}, colorSchemesInput.dark, {
        palette: darkPalette,
        opacity: _extends({
          placeholder: 0.5,
          inputTouchBottomLine: 0.7
        }, (_colorSchemesInput$da2 = colorSchemesInput.dark) == null ? void 0 : _colorSchemesInput$da2.opacity)
      })
    })
  });

  Object.keys(theme.colorSchemes).forEach(function (key) {
    var palette = theme.colorSchemes[key].palette; // attach black & white channels to common node

    if (key === 'dark') {
      palette.common.background = palette.common.background || '#000';
      palette.common.onBackground = palette.common.onBackground || '#fff';
    } else {
      palette.common.background = palette.common.background || '#fff';
      palette.common.onBackground = palette.common.onBackground || '#000';
    }

    palette.common.backgroundChannel = colorChannel(palette.common.background);
    palette.common.onBackgroundChannel = colorChannel(palette.common.onBackground);
    palette.dividerChannel = colorChannel(palette.divider); // special token for Tooltip
    // TODO: consider adding `main`, and `light` to palette.grey to make it consistent.

    if (!palette.grey.dark) {
      palette.grey.dark = palette.grey[700];
    }

    Object.keys(palette).forEach(function (color) {
      var colors = palette[color]; // Color palettes: primary, secondary, error, info, success, and warning

      if (colors.main) {
        palette[color].mainChannel = colorChannel(colors.main);
      }

      if (colors.light) {
        palette[color].lightChannel = colorChannel(colors.light);
      }

      if (colors.dark) {
        palette[color].darkChannel = colorChannel(colors.dark);
      }

      if (colors.contrastText) {
        palette[color].contrastTextChannel = colorChannel(colors.contrastText);
      } // Text colors: text.primary, text.secondary


      if (colors.primary) {
        palette[color].primaryChannel = colorChannel(colors.primary);
      }

      if (colors.secondary) {
        palette[color].secondaryChannel = colorChannel(colors.secondary);
      }
    });
  });

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  theme = args.reduce(function (acc, argument) {
    return deepmerge(acc, argument);
  }, theme);
  return theme;
}