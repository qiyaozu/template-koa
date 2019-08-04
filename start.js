const path = require('path'),
	koa = new (require('koa'))(),
	router = require('koa-router')(),
	bodyparser = require('koa-bodyparser'), // 对于 POST 请求，将 koa2 上下文的 formData 数据解析到 ctx.request.body
	logger = require('koa-logger'), // 日志中间件
	koaStatic = require('koa-static'),
	historyApiFallback = require('koa-history-api-fallback'),
	userRoute = require('./routes/user.js'),
	loggerRoute = require('./routes/logger.js'),
	goodsRoute = require('./routes/goods.js'),
	cors = require('koa2-cors'),
	imageRoute = require('./routes/image.js'),
	port = 9093,
	koaJwt = require('koa-jwt'), //路由权限控制
	config = require('./config'),
	jwtSecret = config.jwtSecret,
	sendMail = require('./send-mail').main,
	add_logger = require('./model_utils/logger').add,
	dateformat = require('dateformat'),
	{ check_token_expires } = require('./utils'),
	koaBody = require('koa-body');
	
koa.use(koaBody({
	multipart: true,
	formidable: {
		maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
	}
}))
koa.use(bodyparser());
koa.use(logger());
koa.use(historyApiFallback());

koa.on('error', async function (err, ctx) {
	const china_time = dateformat(Date.now() - (8 * 3600 * 1000), 'yyyy-mm-dd HH:MM:ss')
	const err_stack = err.stack.substr((err + '').length, 2000).trim();
	const user_agent = ctx.request.header['user-agent']
	const req_body = ctx.request.body ? JSON.stringify(ctx.request.body) : ''
	const type_error = err + ''
	const url = ctx.request.url
	// 只有在测试环境下不会发送邮件
	if (process.env.NODE_ENV !== 'development' && config.use_email) {
		await sendMail(`${err.stack}`, url, req_body)
	} else {
		console.log('server error: ', err);
	}

	if(process.env.NODE_ENV !== 'development' && config.logger) {
		// 数据库中time的类型为timestamp类型
		await add_logger(err_stack, china_time, user_agent, req_body, type_error, url)
	}
});

// 静态文件服务 koa-static 规则位于 koa-router 的系列规则之前
koa.use(koaStatic(path.resolve('dist'))); // 将 webpack 打包好的项目目录作为 Koa 静态文件服务的目录

// json-web-token使用
koa.use(function (ctx, next) {
	return next().catch((err) => {
		if (401 == err.status) {
			ctx.status = 401;
			ctx.body = {
				success: false,
				msg: '缺少Token'
			};
		} else {
			throw err;
		}
	});
});

koa.use(koaJwt({ secret: jwtSecret }).unless({
	path: [/^\/api\/user\/login/, /^\/api\/user\/register/, /^\/api\/uploads\/img/,
		/^\/dist/, /^\/api\/user\/code/, /^\/api\/logger/]
}))

// 检查token是否过期
koa.use(async function(ctx, next) {
	await check_token_expires(ctx, next)
})

// 挂载到 koa-router 上，同时会让所有的 user 的请求路径前面加上 '/auth' 前缀。
router.use('/api/user', userRoute.routes());

router.use('/api/goods',goodsRoute.routes());

router.use('/api', imageRoute.routes());

router.use('/api/logger', loggerRoute.routes());

koa.use(router.routes()); // 将路由规则挂载到Koa上。

koa.use(cors());

koa.listen(port, () => {
	console.log('Koa is listening on port ' + port);
});

module.exports = koa;
