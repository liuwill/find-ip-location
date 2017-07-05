'use strict';

var chai = require('chai');

chai.should();
var expect = chai.expect;
var assert = chai.assert;

var decoder = require('../lib/decoder');

describe('lib/decoder', function () {
  describe('parse()', function () {
    it('ip to long', function () {
      expect(decoder.parseIP('122.205.143.255')).to.be.equal(2060292095)
      expect(decoder.parseIP('58.24.0.15')).to.be.deep.equal(974651407)
    });
  });
});
