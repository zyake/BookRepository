function XhrError(args) {
  Error.apply(this, [args]);
}

XhrError.prototype = new Error();