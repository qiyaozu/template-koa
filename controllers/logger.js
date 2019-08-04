const loggerModel = require('../model_utils/logger.js');

class loggerController {
    static async add (ctx) {
        const body = ctx.request.body
        if(body.desc) {
            await loggerModel.add(body.desc)
            ctx.body = {
                success: true,
                msg: 'logger add success'
            }
        }
        
    }

    static async remove(ctx){
        console.log('logger remove......')
        const body = ctx.request.body
        let obj = {
            success: false,
            msg: ''
        }
        if (!body.id) {
            obj.msg = 'id is require'
            ctx.body = obj
            return
        }
        const result = await loggerModel.removeLogger(body.id)
        if (result) {
            ctx.body = {
                success: true,
                msg: 'delete logger success~'
            }
        }
    }

    // 获取logger列表，分页
	static async getAll(ctx) {
		const data = ctx.request.body; // post 请求，参数在 request.body 里
		const pageSize = Number(data.pageSize) || 5;
		const pageIndex = Number(data.pageIndex) || 0;
        const result = await loggerModel.getList(pageIndex, pageSize);
        console.log(result)

		ctx.body = {
			success: true,
			result,
			total: result.count,
			msg: '获取logger列表成功！'
		}
	}
}

module.exports = loggerController