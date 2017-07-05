'use strict';

var fs = require('fs')
var assert = require('assert')
var database = require('./lib/database')

exports.loadDB = function (dbPath, callback) {
  assert(typeof callback, 'function', 'Callback function must be provided.')
  // assert(dbPath, 'dat file path must be provided.')
  // if(!fs.existsSync(dbPath)){
  //   throw new Error("file is not exist")
  // }

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
    callback(null, bufferDb)
  })
}

exports.loadDBSync = function (dbPath) {
  // assert(dbPath, 'dat file path must be provided.')
  // if(!fs.existsSync(dbPath)){
  //   throw new Error("file is not exist")
  // }

  var bufferData = fs.readFileSync(dbPath)
  var bufferDb = database.create(bufferData)

  return bufferDb
}
