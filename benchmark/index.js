'use strict'

// process.env.UV_THREADPOOL_SIZE=128
var benchmark = require('benchmark')
var ipQuery = require('../index')
var sampleFilePath = __dirname + '/../data/ip.production.db'

var suite = new benchmark.Suite()

var ip = '61.136.112.25'
var local = '127.0.0.1'

var ipFinderGlobal = ipQuery.loadDBSync(sampleFilePath)

// add tests
suite.add('sync read file', function () {
  var ipFinder = ipQuery.loadDBSync(sampleFilePath)
  ipFinder.find(ip)
  ipFinder.find(local)
}).add('global read file', function () {
  ipFinderGlobal.find(ip)
  ipFinderGlobal.find(local)
})
  // add listeners
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  // run async
  .run({ 'async': true })
