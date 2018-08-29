# find-ip-location
  [![Build Status][travis-image]][travis-url]
  [![AppVeyor branch][appveyor-image]][appveyor-url]
  [![Coverage Status][coverage-image]][coverage-url]
  [![NPM version][npm-image]][npm-url]
  [![Maintainability][maintainability-image]][maintainability-url]

参考[maxmind](https://github.com/runk/node-maxmind)实现的纯javascript地址库；基于[ipb](http://iac-i.org/#)提供的付费ip地址库实现ip地址解析，中国国内的地址精确到省市，国外的精确到国家。需要使用配套工具将提供的ip地址库文件，转换成工具需要的二进制格式文件。该地址库主要针对中国国内的ip地址解析。

## Installation

```shell
$ npm install --save find-ip-location
```

## Usage：

```javascript
var ipQuery = require("find-ip-location")
var sampleFilePath = 'db path'

// Sync
var ipFinder = ipQuery.loadDBSync(sampleFilePath)
ipFinder.find('66.6.44.4')

// Async
ipQuery.loadDB(sampleFilePath, (err, ipFinder) => {
  if(err){
    console.log(err.message)
  }else{
    ipFinder.find('66.6.44.4')
  }
})
```

返回的参数包含：["startIP", "endIP", "code", "province", "hanCity", "city", "isoCode", 'provinceCode', 'cityCode', 'countryCode', 'country']

## License

  [MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/find-ip-location.svg?style=flat-square
[npm-url]: https://npmjs.org/package/find-ip-location
[travis-image]: https://img.shields.io/travis/liuwill/find-ip-location/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/liuwill/find-ip-location
[download-image]: https://img.shields.io/npm/dm/find-ip-location.svg?style=flat-square
[download-url]: https://npmjs.org/package/find-ip-location
[coverage-image]: https://img.shields.io/coveralls/liuwill/find-ip-location/master.svg?style=flat-square
[coverage-url]: https://coveralls.io/github/liuwill/find-ip-location
[licence-image]: https://img.shields.io/npm/l/find-ip-location.svg?style=flat-square
[david-dependency-image]: https://img.shields.io/david/liuwill/find-ip-location.svg?style=flat-square
[david-dev-image]: https://img.shields.io/david/dev/liuwill/find-ip-location.svg?style=flat-square
[quality-image]: https://img.shields.io/codeclimate/github/liuwill/find-ip-location.svg?style=flat-square
[quality-url]: https://codeclimate.com/github/liuwill/find-ip-location
[bithound-image]: https://img.shields.io/bithound/code/github/liuwill/find-ip-location.svg?style=flat-square
[bithound-url]: https://www.bithound.io/github/liuwill/find-ip-location
[appveyor-image]: https://img.shields.io/appveyor/ci/liuwill/find-ip-location/master.svg?style=flat-square
[appveyor-url]: https://ci.appveyor.com/project/liuwill/find-ip-location
[maintainability-image]: https://api.codeclimate.com/v1/badges/622c9f4f3cd0b2349b41/maintainability
[maintainability-url]: https://codeclimate.com/github/liuwill/find-ip-location/maintainability
