const verify_token = require('./verify_token')
const config = require('./config')
const jwtSecret = config.jwtSecret
const tokenExpiresTime = config.tokenExpiresTime
/**
 * 生成随机数字类型字符串
 * @param  {[str]} len 生成字符串的长度
 * @return {[str]} tmp 返回生成的字符串
 */
function randomNum (len) {
	let x = '0123456789'
	let tmp = ''
	for (var i = 0; i < len; i++) {
	  tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length)
	}
	return tmp
}

/**
 * 生成随机字符串
 * @param  {[str]} key 需要获取的key
 * @return {[str]} value 返回key对应的值
 */
function randomChar (len) {
	let x = '0123456789qwertyuioplkjhgfdsazxcvbnm'
	let tmp = ''
	for (var i = 0; i < len; i++) {
	  tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length)
	}
	return tmp
}

function checkMobile (mobile) {
	let reg = /^[1][3,4,5,7,8][0-9]{9}$/
	return reg.test(mobile)
}

async function check_token_expires(ctx, next) {
	// 这里注意：这里配置了白名单，上面的unless里面也要配置
	let white_list = ['login', 'register', 'code', 'img']
	
	if (white_list.includes(ctx.request.url.substring(ctx.request.url.lastIndexOf('/') + 1))) {
		await next()
		return
	}
	if (ctx.request.url.substring(ctx.request.url.lastIndexOf('/') + 1).startsWith('logger')) {
		await next()
		return
	}

	const token = ctx.header.authorization.split(' ')[1]
	const decode_token = await verify_token(token, jwtSecret)
	if (Date.now() - decode_token.exp > tokenExpiresTime) {
		ctx.body = {
			code: 401,
			msg: 'Token 过期'
		}
	} else {
		await next()
	}
}


module.exports = {
    randomChar,
	randomNum,
	checkMobile,
	check_token_expires
}