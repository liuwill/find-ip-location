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
    });
  });

  describe("class IPDatabase", function () {
    var ipDatabase

    before(function () {
      ipDatabase = database.create(sampleBuffer)
    });

    it('should find china Municipality city', function () {
      var loc = ipDatabase.find('223.255.236.15')
      assert.isNotNull(loc, 'location should exist')
      expect(loc).to.have.all.keys(decoder.TARGET_LOCATION_FIELDS)

      expect(loc).to.have.property('city', 'shanghai')
      expect(loc).to.have.property('province', '上海市')
    });

    it('should find china region', function () {
      var loc = ipDatabase.find('223.254.250.44')
      assert.isNotNull(loc, 'location should exist')
      expect(loc).to.have.all.keys(decoder.TARGET_LOCATION_FIELDS)

      expect(loc).to.have.property('city', 'taiwan')
      expect(loc).to.have.property('provinceCode', '71')
    });

    it('should find country out of china', function () {
      var loc = ipDatabase.find('14.102.156.88')
      assert.isNotNull(loc, 'location should exist')
      expect(loc).to.have.all.keys(decoder.TARGET_LOCATION_FIELDS)

      expect(loc).to.have.property('country', '日本')
      expect(loc).to.have.property('isoCode', 'JP')
    });

    it('should return null when ip find fail', function () {
      var nullLoc = ipDatabase.find('127.0.0.1')
      expect(nullLoc).to.be.a('null')
    });

  });
});
