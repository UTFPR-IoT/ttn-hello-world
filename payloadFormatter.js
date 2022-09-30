function decodeUplink(input) {
  return {
    data: {
      msg: String.fromCharCode.apply(null, input.bytes)
    },
    warnings: [],
    errors: []
  };
}
