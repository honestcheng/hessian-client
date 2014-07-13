var assert = require('chai').assert,
HessianClient = require('../hessian');

describe('hessian 1.0 test', function(){
	var hc;
	before(function(){
		hc = new HessianCient('http://hessian.caucho.com/test/test')
	})
	
	it('methodNull', function(done){
		hc.invoke('methodNull',[], function(err,res){
			assert.isNull(res)
			done(err)
		})
	})
	
	it('replyNull', function(done){
		hc.invoke('replyNull', null, function(err,res){
			assert.isNull(res)
			done(err)
		})
	})
})

