const router = require('koa-router')();
const views = require('koa-views');
const path = require('path');
console.log('cur view dir route:  ',path.join(__dirname ,'views'));
//router.use(views(path.join(__dirname ,'views')));
router.use(views(__dirname + '/../views'));// 用在路由前
// router.get('/', async (ctx, next) => {
//      await ctx.render('index');
// });

const Utils={
    list: (ctx) => {
        const names = Object.keys(db);
        ctx.body = 'pets: ' + names.join(', ');
    },
    show: (ctx, name) => {
        const pet = db[name];
        if (!pet) return ctx.throw('cannot find that pet', 404);
        ctx.body = pet.name + ' is a ' + pet.species;
    },
    error:ctx=>{
        console.log('internal server error...................');
        ctx.throw(500);
    },
    redirect:ctx=>{
        ctx.response.redirect('/2.html');
        ctx.response.body = '<a href="/">Index Page</a>';
    },
    main:(ctx,id)=>{
        console.log('>>>>>id: ',id);// 获取参数
        const n = Number(ctx.cookies.get('view') || 0) + 1;
        ctx.cookies.set('view', n);
        ctx.response.body='hello main views: '+n;
    },
    getBody:ctx=>{
        const body = ctx.request.body;
        console.log('>>>>>>>>>>>>>>>11111>>>>>>>>>>>>:',body,typeof body)
        if (!body.name) ctx.throw(400, '.name required');
        ctx.response.body = { name: body.name };
        //ctx.body = { name: body.name };
    },
    handler:ctx=>{
        //如果错误被try...catch捕获，就不会触发error事件
        try {
            //await next();
            ctx.throw(500);
        } catch (err) {
            ctx.response.status = err.statusCode || err.status || 500;
            ctx.response.body = {
            message: err.message
            };
            ctx.app.emit('error', err, ctx);// 传error到 app外层
        }
    },
    home: async (ctx)=>{
        console.log('>>>>>>>>>>>>>>>>: ')
        await ctx.render('index',{user:'vingo'});
    },
    index:(ctx)=>{
        ctx.body='index page'
    }
};
router.get('/redirect', Utils.redirect);
router.get('/error', Utils.error);
router.get('/handler', Utils.handler);
router.post('/body', Utils.getBody);
router.get('/home', Utils.home);
router.get('/views/:id', Utils.main);
router.get('/index', Utils.index);


module.exports = router;    