'use strict';

var assert = require('assert');

var ipDatabase = {
  bufferData: null,
  reload: function (bufferData) {
    ipDatabase.bufferData = bufferData
  },
  find: function (ip) {
  }
}

exports.create = function (bufferData) {
  assert(Buffer.isBuffer(bufferData), "bufferData should be Buffer")

  ipDatabase.reload(bufferData)
  return ipDatabase
}
