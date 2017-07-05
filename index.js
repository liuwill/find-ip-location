'use strict';

var fs = require('fs')
var assert = require('assert')
var database = require('./lib/database')

exports.loadDB = function (dbPath, callback) {
  assert.equal(dbPath, 'dat file path must be provided.')
  assert.equal(typeof callback, 'function', 'Callback function must be provided.')

  fs.readFile(dbPath, function (err, bufferData) {
    if (err) {
      return callback(err)
    }

    var bufferDb = database.create(bufferData)
    fs.watch(dbPath, function () {
      fs.readFile(dbPath, function (err, bufferData) {
        if (err) {
          return callback(err)
        }
        bufferDb.reload(bufferData)
      })
    })
    callback(null, {})
  })
}
