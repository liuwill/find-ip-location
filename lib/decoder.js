'use strict'

var assert = require('assert')

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
  for(var i in ips){
    var part = ips[i]
    ipNumber += part * multipliers[i]
  }

  return ipNumber
}
