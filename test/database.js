'use strict'

var fs = require('fs')
var chai = require('chai')

chai.should()
var expect = chai.expect
var assert = chai.assert

var database = require('../lib/database')
var sampleBuffer = fs.readFileSync(__dirname + '/../data/ip_db.sample.dat')

describe('lib/database', function () {
  describe('create()', function () {
    it('should create ipDatabase', function () {
      var mockBuffer = Buffer.from("")
      var ipDatabase = database.create(mockBuffer)

      assert.isObject(ipDatabase)
      assert.isFunction(ipDatabase.find)
    });

    it('should create ipDatabase', function () {
      var ipDatabase = database.create(sampleBuffer)

      assert.isObject(ipDatabase)
      assert.isFunction(ipDatabase.find)
      var loc = ipDatabase.find('58.24.0.15')
      expect(loc).to.not.be.empty
    });
  });
});
