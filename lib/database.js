'use strict'

var assert = require('assert')
var decoder = require('./decoder')
var utils = require('./utils')

function IPDatabase(bufferData) {
  this.bufferData = bufferData
}

IPDatabase.prototype.reload = function (bufferData) {
  this.bufferData = bufferData
}

IPDatabase.prototype.find = function (ip) {
  var pos = utils.searchBinaryTree(ip, this.bufferData)
  if (pos === -1) {
    return null
  }

  var rawLine = utils.getRawDataFromBuffer(this.bufferData, pos)
  var ipData = decoder.parseLocation(rawLine)

  return ipData
}

exports.IPDatabase = IPDatabase

exports.create = function (bufferData) {
  assert(Buffer.isBuffer(bufferData), "bufferData should be Buffer")

  var ipDatabase = new IPDatabase(bufferData)
  return ipDatabase
}

