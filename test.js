const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const path = require('path');

app.use(views(__dirname + '/views', {
    map: { html: 'ejs'}
}));
// log request URL:
app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
console.log('cur view dir:  ',path.join(__dirname ,'views'));
//router.use(views(path.join(__dirname ,'views')));

router.get('/hello', async function(ctx, next){
    console.log('///////////////////');
    await ctx.render('index.html',{user:'john'});
    //ctx.body='aaaaaaaaaa';
    //ctx.render('index');
});

app.use(router.routes());//.use(route.allowedMethods());  //koa-router

app.on('error',(err,ctx)=>{
    console.log('error catched:',err);
});
const port=4001;
app.listen(port);
console.log('start server localhost:',port);
