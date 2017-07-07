'use strict'

var chai = require('chai')

chai.should()
var expect = chai.expect
var assert = chai.assert

var decoder = require('../lib/decoder')

describe('lib/decoder', function () {
  describe('parse()', function () {
    it('ip to long', function () {
      expect(decoder.parseIP('122.205.143.255')).to.be.equal(2060292095)
      expect(decoder.parseIP('58.24.0.15')).to.be.deep.equal(974651407)
    });
  });

  describe('parseLocation()', function () {
    it('location parser', function () {
      var locData = decoder.parseLocation('210.39.104.0,210.39.107.255,1156440100,广东省,广州市,guangzhou,CN')

      assert.isNotNull(locData, 'location should exist')
      expect(locData).to.have.all.keys(decoder.TARGET_LOCATION_FIELDS)

      expect(locData).to.have.property('city', 'guangzhou')
      expect(locData).to.have.property('cityCode', '440100')
    });
  });
});
