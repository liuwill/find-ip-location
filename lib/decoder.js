'use strict'

var assert = require('assert')

var LOCATION_FIELDS = ["startIP", "endIP", "code", "province", "hanCity", "city", "isoCode"]
exports.LOCATION_FIELDS = LOCATION_FIELDS
exports.TARGET_LOCATION_FIELDS = ['provinceCode', 'cityCode', 'countryCode', 'country'].concat(LOCATION_FIELDS)

/**
 * 将字符串IP转成long
 * @param {String} ip ip地址
 * @returns {Number} long类型的地址
 */
exports.parseIP = function (ip) {
  assert(ip, 'ip is required')
  var multipliers = [0x1000000, 0x10000, 0x100, 1]
  var ips = ip.split(".")

  var ipNumber = 0
  for (var i in ips) {
    var part = ips[i]
    ipNumber += part * multipliers[i]
  }

  return ipNumber
}

exports.parseLocation = function (line) {
  assert(typeof line === 'string', 'string line is needed')
  var lineArr = line.split(',')
  var fields = LOCATION_FIELDS

  var lineData = {}
  for (var i in fields) {
    var key = fields[i]
    lineData[key] = lineArr[i]
  }

  var countryCode = lineData['code'].substr(1, 3)
  var provinceCode = lineData['code'].substr(4, 2)
  var cityCode = lineData['code'].substr(4, 6)

  lineData['countryCode'] = countryCode
  lineData['provinceCode'] = provinceCode
  lineData['cityCode'] = cityCode

  if (isChina(countryCode)) {
    if (isChinaMunicipality(cityCode)) {
      lineData['province'] = lineData['hanCity']
    }
    lineData['country'] = '中国'
  } else if (isChinaRegion(countryCode)) {
    lineData['country'] = '中国'
    lineData['province'] = lineData['hanCity']
    lineData['provinceCode'] = getChinaRegionProvinceCode(countryCode)
  } else {
    lineData['country'] = lineData['hanCity']
  }

  return lineData
}

function isChinaMunicipality(cityCode) {
  return cityCode.substr(2, 4) === "0000" && cityCode.substr(0, 2) !== "00"
}

function isChinaRegion(countryCode) {
  return countryCode === '158' || countryCode === '344' || countryCode === '446'
}

function isChina(countryCode) {
  return countryCode === '156'
}

function getChinaRegionProvinceCode(countryCode) {
  var regionMap = {
    '158': '71',
    '344': '91',
    '446': '92'
  }
  return regionMap[countryCode]
}
