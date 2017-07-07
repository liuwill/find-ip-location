'use strict'

var chai = require('chai')

var utils = require('../lib/utils')

chai.should()
var expect = chai.expect

describe('lib/utils', function () {
  describe('getRawDataFromBuffer()', function () {
    it('should throw where out of index', function () {
      expect(function () { utils.getRawDataFromBuffer(Buffer.alloc(utils.LINE_BINARY_LENGTH), 2) }).to.throw()
      expect(function () { utils.getRawDataFromBuffer(Buffer.alloc(utils.LINE_BINARY_LENGTH * 2), 1) }).to.not.throw()
    });
  });

  describe('getIpPosFromBinary()', function () {
    it('should throw where out of index', function () {
      expect(function () { utils.getIpPosFromBinary(Buffer.alloc(utils.LINE_BINARY_LENGTH), 2 + utils.LINE_BINARY_LENGTH) }).to.throw()
      expect(function () { utils.getIpPosFromBinary(Buffer.alloc(utils.LINE_BINARY_LENGTH * 2), utils.LINE_BINARY_LENGTH) }).to.not.throw()
    });
  });
});
