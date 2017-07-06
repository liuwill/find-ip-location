'use strict'

var fs = require('fs')
var chai = require('chai')
var sinon = require('sinon');

var ipQuery = require('../index')

chai.should()
var expect = chai.expect
var assert = chai.assert

var sampleFilePath = __dirname + '/../data/ip.sample.db'
var IPDatabase = require('../lib/database').IPDatabase

describe('ipQuery', function () {
  var watchHandler
  var watchCount

  before(function () {
    watchCount = 0

    sinon.spy(fs, 'readFile')
    sinon.stub(fs, 'watch').callsFake(function (path, callback) { watchHandler = callback })
  });

  describe('sync()', function () {
    var ipDatabase
    before(function () {
      ipDatabase = ipQuery.loadDBSync(sampleFilePath)
    })

    it('should read sample data', function () {
      assert.instanceOf(ipDatabase, IPDatabase)
      assert.isFunction(ipDatabase.find)
    });

    it('should find china city', function () {
      var locData = ipDatabase.find('61.136.112.25')
      expect(locData).to.be.an('object')
      expect(locData).to.deep.include({isoCode: 'CN'});
    });
  });

  describe('async()', function () {

    it('should read sample data', function (done) {
      ipQuery.loadDB(sampleFilePath, function (err, ipDatabase) {
        assert.isNull(err)
        assert.isFunction(ipDatabase.find)

        assert(fs.readFile.calledOnce);
        watchHandler();
        assert(fs.readFile.calledTwice);
        done()
      })
    });

    it('should read sample data and watch err', function (done) {
      ipQuery.loadDB(sampleFilePath, function (err, ipDatabase) {
        if (watchCount++ == 0) {
          assert.isNull(err)
          assert.isFunction(ipDatabase.find)

          fs.readFile.restore()
          sinon.stub(fs, 'readFile').callsFake(function (path, callback) { callback(new Error('read error')) })

          watchHandler()
        } else {
          assert.isNotNull(err)
          done()
        }
      })
    });

    it('should call when read err', function (done) {
      ipQuery.loadDB("sampleFilePath", function (err, ipDatabase) {
        assert.isNotNull(err)
        expect(ipDatabase).to.be.a('undefined')
        done()
      })
    });
  });

});
