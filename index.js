const fs = require('fs');
const path = require('path');
const serve = require('koa-static');
const route=require('koa-route');
const Koa=require('koa');
const app = new Koa();
const main = ctx => {
    let path=ctx.request.path;
    switch(path){
        case '/':
            ctx.response.type = 'text';
            ctx.response.body = 'Hello World';
        break;
        case '/about':
            ctx.response.type = 'html';
            ctx.response.body = fs.createReadStream('./demo.html');
        break;
        default :
            ctx.response.type = 'html';
            ctx.response.body = 'error route';
        break;        
    }
};
const news =ctx=>{
    ctx.response.body="news";
}

const mainServer = serve('static');
app.use(mainServer);//static server
// app.use(route.get('/news',news));//route 
// app.use(main);
app.listen(5000);