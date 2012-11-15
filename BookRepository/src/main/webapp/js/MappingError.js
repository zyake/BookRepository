function MappingError(args) {
  Error.apply(this, [args]);
  
}

MappingError.prototype = new Error();