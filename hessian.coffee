req = require 'request'
hessianjs = require 'hessian.js'

class HessianClient
	constructor: (@url) ->
		
	invoke: (method, args, callback) -> 
		build_post_data= (method, args) ->
			#call ::= c x01 x00 m method.length methodname
			buf = new Buffer [0x00,0x01,0x00,0x00,0x00,0x00]
			buf.write 'c'
			buf.write 'm',3
			buf.writeInt16BE method.length,4
			buf= Buffer.concat([buf,new Buffer(method)])
			
			#append args
			for arg in args
				buf = Buffer.concat([buf,new Buffer(hessianjs.encode(arg))])
			
			buf = Buffer.concat([buf, new Buffer('z')])
			buf
			
		parse_response= (res_data) ->
			buf = new Buffer res_data
			hessianjs.decode(buf[3..-1])
			
		
		option =
			url: @url
			headers: {'Content-Type': 'application/binary'}
			method: 'POST' 
			body: build_post_data(method, args)
		
		cb = (error, res, body) ->
			#data = hessianjs.decode(body)
			callback(error,res, parse_response(body))
			
		req option,cb 
	
	
			
	
		
#client = new HessianClient('http://180.96.38.219/XuanR_YogAppProject/InfoSelectServer')
#client.invoke('GetGameInfo',['000000','CHI'], (error,res,data)->
#	games = data['GameTypeInfo']
#	console.log(games[0].name)
#)

	
module.exports = HessianClient