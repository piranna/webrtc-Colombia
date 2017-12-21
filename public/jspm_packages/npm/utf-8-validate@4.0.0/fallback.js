/* */ 
(function(Buffer) {
  'use strict';
  const isValidUTF8 = (buf) => {
    var len = buf.length;
    var i = 0;
    while (i < len) {
      if (buf[i] < 0x80) {
        i++;
      } else if ((buf[i] & 0xe0) === 0xc0) {
        if (i + 1 === len || (buf[i + 1] & 0xc0) !== 0x80 || (buf[i] & 0xfe) === 0xc0) {
          return false;
        } else {
          i += 2;
        }
      } else if ((buf[i] & 0xf0) === 0xe0) {
        if (i + 2 >= len || (buf[i + 1] & 0xc0) !== 0x80 || (buf[i + 2] & 0xc0) !== 0x80 || buf[i] === 0xe0 && (buf[i + 1] & 0xe0) === 0x80 || buf[i] === 0xed && (buf[i + 1] & 0xe0) === 0xa0) {
          return false;
        } else {
          i += 3;
        }
      } else if ((buf[i] & 0xf8) === 0xf0) {
        if (i + 3 >= len || (buf[i + 1] & 0xc0) !== 0x80 || (buf[i + 2] & 0xc0) !== 0x80 || (buf[i + 3] & 0xc0) !== 0x80 || buf[i] === 0xf0 && (buf[i + 1] & 0xf0) === 0x80 || buf[i] === 0xf4 && buf[i + 1] > 0x8f || buf[i] > 0xf4) {
          return false;
        } else {
          i += 4;
        }
      } else {
        return false;
      }
    }
    return true;
  };
  module.exports = isValidUTF8;
})(require('buffer').Buffer);
