var http = require('http')
var url = require('url')

function start(route, handler) {
	function onRequest(request, response) {
		response.writeHead(200, {'Content-type': 'text/plain'})

		var pathname = url.parse(request.url).pathname
	  
		var content = route(handler, pathname)
		console.log(content)
		response.write(content)
		response.end()

	}

	http.createServer(onRequest).listen(8888)
}


exports.start = start

