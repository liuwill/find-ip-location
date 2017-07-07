'use strict';

var fs = require('fs')
var assert = require('assert')
var database = require('./lib/database')

exports.loadDB = function (dbPath, callback) {
  assert(typeof callback, 'function', 'Callback function must be provided.')

  fs.readFile(dbPath, function (err, bufferData) {
    if (err) {
      callback(err)
      return
    }

    var bufferDb = database.create(bufferData)
    fs.watch(dbPath, function () {
      fs.readFile(dbPath, function (err, bufferData) {
        if (err) {
          callback(err)
          return
        }
        bufferDb.reload(bufferData)
      })
    })
    callback(null, bufferDb)
  })
}

exports.loadDBSync = function (dbPath) {
  var bufferData = fs.readFileSync(dbPath)
  var bufferDb = database.create(bufferData)

  return bufferDb
}
