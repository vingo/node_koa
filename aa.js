const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const path = require('path');
 
// Must be used before any router is used
app.use(views(__dirname + '/views', {
  map: {
    html: 'ejs'
  }
}));
 
// app.use(async function (ctx, next) {
//   ctx.state = {
//     session: this.session,
//     title: 'app'
//   };
//     await ctx.render('index', {
//         user: 'John'
//     });
// });
router.get('/hello', async function(ctx){
    console.log('///////////////////');
    await ctx.render('index.html',{user:'john2'});
});

app.use(router.routes());//.use(route.allowedMethods());  //koa-router

app.on('error',(err,ctx)=>{
    console.log('error catched:',err);
});
app.listen(4001);
console.log('start server localhost:6000');
