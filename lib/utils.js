'use strict'

var parseIP = require('./decoder').parseIP
var LINE_BINARY_LENGTH = 144

exports.searchBinaryTree = function (ip, byteBuffer) {
  var ipLong = parseIP(ip)

  var low = 0
  var high = byteBuffer.length / LINE_BINARY_LENGTH - 1

  while (low <= high) {
    var middle = ((low + high) >> 1)
    var offset = middle * LINE_BINARY_LENGTH

    var indexData = getIpPosFromBinary(byteBuffer, offset)
    if (ipLong < indexData.start) {
      high = middle - 1
    } else if (ipLong > indexData.end) {
      low = middle + 1
    } else {
      return middle
    }
  }
  return -1
}

exports.getRawDataFromBuffer = function (byteBuffer, offsetPos) {
  var offset = offsetPos * LINE_BINARY_LENGTH
  if (offset > byteBuffer.length) {
    throw new Error("out of index")
  }

  var bufferLen = byteBuffer.readUInt16BE(offset + 16)
  var bufferContent = byteBuffer.slice(offset + 18, offset + bufferLen + 18).toString()
  return bufferContent
}

var getIpPosFromBinary = function (byteBuffer, offset) {
  var startIp = byteBuffer.readDoubleBE(offset)
  var endIp = byteBuffer.readDoubleBE(offset + 8)

  if (offset > byteBuffer.length) {
    throw new Error("out of index")
  }

  return {
    start: startIp,
    end: endIp
  }
}

exports.getIpPosFromBinary = getIpPosFromBinary
