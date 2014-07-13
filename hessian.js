// Generated by CoffeeScript 1.7.1
(function() {
  var HessianClient, hessianjs, req;

  req = require('request');

  hessianjs = require('hessian.js');

  HessianClient = (function() {
    function HessianClient(url) {
      this.url = url;
    }

    HessianClient.prototype.invoke = function(method, args, callback) {
      var build_post_data, cb, option, parse_response;
      build_post_data = function(method, args) {
        var arg, buf, _i, _len;
        buf = new Buffer([0x00, 0x01, 0x00, 0x00, 0x00, 0x00]);
        buf.write('c');
        buf.write('m', 3);
        buf.writeInt16BE(method.length, 4);
        buf = Buffer.concat([buf, new Buffer(method)]);
        for (_i = 0, _len = args.length; _i < _len; _i++) {
          arg = args[_i];
          buf = Buffer.concat([buf, new Buffer(hessianjs.encode(arg))]);
        }
        buf = Buffer.concat([buf, new Buffer('z')]);
        return buf;
      };
      parse_response = function(res_data) {
        var buf;
        buf = new Buffer(res_data);
        return hessianjs.decode(buf.slice(3));
      };
      option = {
        url: this.url,
        headers: {
          'Content-Type': 'application/binary'
        },
        method: 'POST',
        body: build_post_data(method, args)
      };
      cb = function(error, res, body) {
        return callback(error, res, parse_response(body));
      };
      return req(option, cb);
    };

    return HessianClient;

  })();

  module.exports = HessianClient;

}).call(this);
