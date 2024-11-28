"use strict";

exports.__esModule = true;

var _SequenceAnimator = require("./SequenceAnimator");

Object.keys(_SequenceAnimator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SequenceAnimator[key]) return;
  exports[key] = _SequenceAnimator[key];
});

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _types[key]) return;
  exports[key] = _types[key];
});
//# sourceMappingURL=index.js.map