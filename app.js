const http = require('http');
const https = require('https');
const Koa = require('koa');
const app = new Koa();
const KeyGrip=require('KeyGrip');
//const route = require('koa-route');
const json = require('koa-json')
const views = require('koa-views')
 var Router = require('koa-router');
 var route = new Router();
const path = require('path');
const serve = require('koa-static');
const koaBody = require('koa-body');
const ejs = require('ejs');

app.use(views(__dirname + '/views', {
    map: { html: 'ejs'}
}));
app.use(serve(path.join('static')));//staic server 
app.use(koaBody({ multipart: true }));// body parse 


// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

   

app.use(async function(ctx,next){
     await next();
    ctx.set('X-response-time2',Date.now());
})
// logger
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.keys = ['im a newer secret', 'i like turtle'];
app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');



const route_app=require('./routes/app');
app.use(route_app.routes());
app.use(route.routes()).use(route.allowedMethods());  //koa-router

app.on('error',(err,ctx)=> {
    console.log('>>>>>>>>>>>>> internal server error', err)
})
app.on('unhandleError',(err,ctx)=> {
    console.log('>>>>>>>>>>>>> listen server unhandleError:', err)
})
app.listen(5000);
// http.createServer(app.callback(ctx=>{
//     ctx.body='hello world 1';
// })).listen(3001);
// https.createServer(app.callback(ctx=>{
//     ctx.body='hello world 2';
//})).listen(5000);