"use strict";

exports.__esModule = true;

var _SequenceAnimator = require("./SequenceAnimator");

Object.keys(_SequenceAnimator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SequenceAnimator[key]) return;
  exports[key] = _SequenceAnimator[key];
});

var _SpriteAnimator = require("./SpriteAnimator");

Object.keys(_SpriteAnimator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SpriteAnimator[key]) return;
  exports[key] = _SpriteAnimator[key];
});
//# sourceMappingURL=index.js.map