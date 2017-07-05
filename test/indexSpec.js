'use strict'

var fs = require('fs')
var chai = require('chai')
var sinon = require('sinon');

var ipQuery = require('../index')

chai.should()
var expect = chai.expect
var assert = chai.assert

var sampleFilePath = __dirname + '/../data/ip_db.sample.dat'

describe('ipQuery', function () {
  var watchHandler
  var watchCount

  before(function () {
    watchCount = 0

    sinon.spy(fs, 'readFile')
    sinon.stub(fs, 'watch').callsFake(function (path, callback) { watchHandler = callback })
  });

  describe('sync()', function () {

    it('should read sample data', function () {
      var ipDatabase = ipQuery.loadDBSync(sampleFilePath)
      assert.isFunction(ipDatabase.find)
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
