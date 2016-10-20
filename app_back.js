// 'use strict'

// var Koa = require('koa')

// var config = {
// 	wechat: {
// 		appID: 'aa',
// 		appSecret: 'bb',
// 		token: 'cc'
// 	}
// }

// var app = new Koa()
// app.use(function *(next) {
// 	console.log(this)
// 	this.body = 'haihahah'
// })
// app.listen(3000)
// console.log('Listening: 3000')

var koa = require('koa');
var app = koa();
// var Promise = require('bluebird');


// x-response-time

app.use(function *(next){
  var start = new Date;
  console.log('print start in 1st middleware: ')
  console.log(start)
  console.log('\n')
  yield next;
  var ms = new Date - start;
  console.log('print after yield in 1st middleware')
  console.log('print ms')
  console.log(ms)
  console.log('\n')
  this.set('X-Response-Time', ms + 'ms');

  yield next
  console.log('print second yield next!!! in 1st middleware')
  console.log('\n')


});

// logger


app.use(function *(next){
  var start = new Date;
  console.log('print start in 2nd middleware: ')
  console.log(start)
  console.log('\n')

  yield next

  var ms = new Date - start;
  console.log('print after yield in 2nd middleware')
  console.log('print ms')
  console.log(ms)
  console.log('\n')
  console.log('%s %s - %s', this.method, this.url, ms, '\n');
  yield next
  console.log('print second yield next!!! in 2nd middleware')
  console.log('\n')
});

// response

app.use(function *(){
	console.log('enter 3rd middleware')
	console.log('this.query ', this.querystring)
	console.log('this.path ', this.path)
	console.log('this.ip', this.ip)
	console.log('this.subdomains', this.subdomains)
	this.body = 'Hello World';
	console.log('about to leave 3rd middleware\n')
});

app.listen(3000);
console.log('listening at 3000\n')