// const TE = require('text-encoding');
const {encode, decode} = require("fastestsmallesttextencoderdecoder");

// const encoder = new TE.TextEncoder('utf-8');
// const decoder = new TE.TextDecoder('utf-8');

const {testVal, intArr} = require('./data');

let encoded;
function testEncode() {
    const startTime = Date.now();
    encoded = encode(testVal);
    console.error("Encode executionTime = " + (Date.now() - startTime));
}

function testDecode() {
    const startTime = Date.now();
    decode(encoded);
    console.error("decode executionTime = " + (Date.now() - startTime));
}


function testConvert() {
    const startTime = Date.now();
    const byteArray = new Uint8Array(10000000);
    for (let n = 0; n < byteArray.length; n++) {
      let a = 1;
    }
    console.error("ExecutionTime = " + (Date.now() - startTime));
  }


testEncode();
testDecode();
testConvert();