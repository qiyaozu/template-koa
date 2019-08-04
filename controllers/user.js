const axios = require('axios')
const fs = require('fs');
const path = require('path');
const userModel = require('../model_utils/user');
const redis = require('../redis')
const jwt = require('jwt-simple')
const jwtSecret = require('../config').jwtSecret,
	tokenExpiresTime = require('../config').tokenExpiresTime;
const { randomNum, checkMobile }  = require('../utils')


class UserController {
	// 获取评分的主要代码
	static async getScore(ctx) {
		const req = ctx.request.body
		let filePath = path.resolve(req.path);
		let data = fs.readFileSync(filePath);
		let imgBase64 = Buffer.from(data).toString('base64');
		let param = `grant_type=client_credentials&client_id=h6DkRq7qijBiGjzOrgsHVagd&client_secret=GtfFbH7NaG9tulMbFoezEDISaibGTbyp`
		let token_res = await axios.get('https://aip.baidubce.com/oauth/2.0/token?' + param)
		let access_token = token_res.data.access_token
		let face_data = await axios.post('https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token='+access_token, {
			image: imgBase64,
			image_type: 'BASE64',
			face_field: 'age,beauty,emotion,race,face_type,gender',
			max_face_num: 5
		})
		this.body = {
			success: true,
			msg: req.path,
			face_data: face_data.data
		}
	  }
	  
	// 登录
	static async login (ctx){
		const formData = ctx.request.body
		if (!formData.user_name || !formData.password) {
			ctx.body = {
				success: false,
				msg: '信息不完整'
			}
			return
		}
		const user_info = await userModel.getUserByName(formData.user_name)
		const obj = {
			success: true,
			msg: ''
		}
		if (user_info) {
			if (user_info.dataValues.password === formData.password) {
				obj.msg = '登录成功'
				let payload = {
					exp: Date.now() + tokenExpiresTime,
					name: formData.user_name
				}
				let token = jwt.encode(payload, jwtSecret)
		
				obj.token = token
			} else {
				obj.success = false
				obj.msg = '密码错误'
			}
		} else {
			obj.success = false
			obj.msg = '未找到用户'
		}
		ctx.body = obj
	}
	// 注册
	static async register(ctx) {
		const formData = ctx.request.body
		let obj = {
			success: false,
			msg: ''
		}
		if(!formData.user_name || !formData.password || !formData.mobile) {
			obj.msg = '参数不完整'
			ctx.body = obj
			return
		}
		if (formData.user_name.length > 30) {
			obj.msg = '用户名过长'
			ctx.body = obj
			return
		}
		if (formData.password.length > 15) {
			obj.msg = '密码长度为6-15位'
			ctx.body = obj
			return
		}
		if (!checkMobile(formData.mobile)) {
			obj.msg = '手机格式不正确'
			ctx.body = obj
			return
		}
		const user_info = await userModel.register(encodeURIComponent(formData.user_name), formData.password, formData.mobile)
		if(user_info) {
			ctx.body = {
				success: true,
				msg: '注册成功'
			}
		}
	}

	// 更改密码
	static async change_pwd(ctx) {
		// 需要手机号/用户名，验证码，旧密码，新密码
	}

	// 获取验证码
	static async getCode(ctx) {
		const formData = ctx.request.body
		if (!formData.mobile) {
			ctx.body = {
				success: false,
				msg: '请输入手机号'
			}
			return
		}
		if (!checkMobile(formData.mobile)) {
			ctx.body = {
				success: false,
				msg: '手机号格式有误'
			}
			return false
		}
		const code = randomNum(4)
		redis.set(formData.mobile + '-code', code, 'EX', 60 * 5);
		ctx.body = {
			success: true,
			code: code
		}
	}
}

module.exports = UserController
