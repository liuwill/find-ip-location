'use strict'

var fs = require('fs')
var chai = require('chai')

chai.should()
var expect = chai.expect
var assert = chai.assert

var database = require('../lib/database')
var decoder = require('../lib/decoder')
var IPDatabase = require('../lib/database').IPDatabase
var sampleBuffer = fs.readFileSync(__dirname + '/../data/ip.sample.db')

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
      assert.instanceOf(ipDatabase, IPDatabase)

      assert.isObject(ipDatabase)
      assert.isFunction(ipDatabase.find)

      var loc = ipDatabase.find('223.255.236.15')
      expect(loc).to.not.be.empty
      expect(loc).to.have.all.keys(decoder.TARGET_LOCATION_FIELDS)

      expect(loc).to.have.property('city', 'shanghai')
      expect(loc).to.have.property('province', '上海市')
    });
  });
});
