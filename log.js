(function (global, factory) {
  // @ts-ignore
  if (typeof define === "function" && define.amd) {
    // @ts-ignore
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    // @ts-ignore
    global.log = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  function log() {
    console.log("Example of UMD module system");
  }
  // expose log to other modules
  exports.log = log;
});