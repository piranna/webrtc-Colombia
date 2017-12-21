/* */ 
(function(Buffer) {
  'use strict';
  const mask = (source, mask, output, offset, length) => {
    for (var i = 0; i < length; i++) {
      output[offset + i] = source[i] ^ mask[i & 3];
    }
  };
  const unmask = (buffer, mask) => {
    const length = buffer.length;
    for (var i = 0; i < length; i++) {
      buffer[i] ^= mask[i & 3];
    }
  };
  module.exports = {
    mask,
    unmask
  };
})(require('buffer').Buffer);
