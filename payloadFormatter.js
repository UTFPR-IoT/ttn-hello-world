function decodeUplink(input) {
  return {
    data: {
      msg: String.fromCharCode.apply(null, input.bytes)
    },
    warnings: [],
    errors: []
  };
}/*
function decodeUplink(input){
  return{
    data: {
      Temperatura: (input.bytes[0] << 8) + input.bytes[1] 
    },
    warnings: [],
    errors: []
  };
}
