const goodsModel = require('../model_utils/goods.js');

class goodsController {
	/**
	* 定义一个变量 用于apiGroup 因为不支持直接输入中文
	* @apiDefine burgess
  */
  
  /**
    * @api {post} /api/goods/add 添加商品 
    * @apiVersion 1.0.0
	  * @apiName add_goods
    * @apiGroup Goods
    *
    * @apiParam (Request body) {String} name 商品名称 （必须）
    * @apiParam (Request body) {String} description 商品描述 （必须）
    * @apiParam (Request body) {String} img_url 商品图片路径 （非必须）
    * 
    * @apiExample {js} Example usage:
    * const data = {
    *   "name": "fasdads",
	  * 	"description": "商品描述"
    * }
    * Authorization is necessary!
    * $http.defaults.headers.common["Authorization"] = token;
    * $http.post(url, data)
    *   .success((res, status) => doSomethingHere())
    *   .error((err, status) => doSomethingHere());
    *
    *
    * @apiSuccessExample {json} Success response:
    *   HTTPS 200 OK
    *   {
    *     "success": true,
    *     "msg": "添加成功"
    *   }
	  *
    */
	static async addGoods(ctx) {
		const data = ctx.request.body;
		if (!data.name || !data.description) {
			ctx.body = {
				success: false,
				msg: '缺少必要参数'
			};
			return
		}
		const result = await goodsModel.addGoods(data.name, data.description, data.img_url);
		ctx.body = {
			success: result,
			msg: result ? "添加成功" : result
		};
	}

	/**
    * @api {post} /api/goods/list 获取商品列表，分页
    * @apiVersion 1.0.0
	  * @apiName get_goods_list
    * @apiGroup Goods
    *
    * @apiParam (Request body) {Number} pageIndex 第几页 （非必须 默认是0）
    * @apiParam (Request body) {Number} pageSize 每页的个数 （非必须 默认是3）
	  * 
    *
    * @apiExample {js} Example usage:
    * const data = {
    *   "pageIndex": 1,
	  * 	"pageSize": 10
    * }
    *
    * $http.defaults.headers.common["Authorization"] = token;
    * $http.post(url, data)
    *   .success((res, status) => doSomethingHere())
    *   .error((err, status) => doSomethingHere());
    *
    * @apiSuccess (Success 201) {String} count 总数
    * @apiSuccess (Success 201) {String} rows 具体数据
    *
    * @apiSuccessExample {json} Success response:
    *     HTTPS 200 OK
    *     "result": {
	  *   	"count": 2,
	  *    	"rows": [
	  *        	{
	  *            	"id": 17,
	  *           	"name": "change_namelafd",
	  *            	"description": "aljflajflajja",
	  *           	"img_url": null
	  *      		},
	  *        	{
	  *           	"id": 14,
	  *           	"name": "change_namelafd1",
	  *             "description": "desc",
    *           	"img_url": null
    *       	}
    *   	]
	  * },
	  *
    */
	static async getGoodsList(ctx) {
		const data = ctx.request.body;
		const pageIndex = Number(data.pageIndex) || 0;
		const pageSize = Number(data.pageSize) || 3;
		const searchVal = data.searchVal || '';
		const result = await goodsModel.getGoodsList(searchVal, pageIndex, pageSize);

		ctx.body = {
			success: true,
			result,
			msg: '获取商品列表成功！'
		}
	}

  /**
    * @api {post} /api/goods/detail 获取商品详情
    * @apiVersion 1.0.0
	  * @apiName get_goods_detail
    * @apiGroup Goods
    *
    * @apiParam (Request body) {Number} id 商品id （必须）
	  * 
    *
    * @apiExample {js} Example usage:
    * const data = {
    *   "id": 1
    * }
    *
    * $http.defaults.headers.common["Authorization"] = token;
    * $http.post(url, data)
    *   .success((res, status) => doSomethingHere())
    *   .error((err, status) => doSomethingHere());
    *
    * @apiSuccessExample {json} Success response:
    *     HTTPS 200 OK
   {
    "success": true,
    "detail": {
        "id": 14,
        "name": "change_namelafd1",
        "description": "desc",
        "img_url": null
    },
    "msg": "获取商品详情成功！"
    }
	  *
    */
	static async getGoodsDetails(ctx) {
		const data = ctx.request.body;
		if (!data.id) {
			ctx.body = {
				success: false,
				msg: '缺少goods id'
			};
			return
		}
    const goods_detail = await goodsModel.getGoodsDetails(data.id);
    if (goods_detail) {
      ctx.body = {
        success: true,
        detail: goods_detail.dataValues,
        msg: '获取商品详情成功！'
      };
    } else {
      ctx.body = {
        success: false,
        msg: '没有此ID的'
      };
    }
		
	}

  /**
    * @api {post} /api/goods/management 更新商品信息
    * @apiVersion 1.0.0
	  * @apiName update_goods
    * @apiGroup Goods
    *
    * @apiParam (Request body) {Number} id 商品id （必须）
    * @apiParam (Request body) {String} name 商品名称 （非必须）
    * @apiParam (Request body) {String} description 商品详情 （非必须）
    * @apiParam (Request body) {String} img_url 商品图片 （非必须） 
    *
    * @apiExample {js} Example usage:
    * name、description、img_url 要三选一
    * const data = {
    *   "id": 1,
    *   "name": "alsjd",
    *   "description": "商品描述",
    *   "img_url": "。。。"
    * }
    *
    * $http.defaults.headers.common["Authorization"] = token;
    * $http.post(url, data)
    *   .success((res, status) => doSomethingHere())
    *   .error((err, status) => doSomethingHere());
    *
    * @apiSuccessExample {json} Success response:
    *     HTTPS 200 OK
    {
      "success": true,
      "msg": "修改成功！"
    }
	  *
    */
	static async manageGoods(ctx) {
		const data = ctx.request.body;
		const id = data.id;
		const name = data.name;
		const description = data.description;
		const img_url = data.img_url;

		let success = false;
		let msg = '';

    if(!id) {
      msg = 'id is require'
    } else {
      if (name || description || img_url) {
        const result = await goodsModel.updateGoods(id, name, description, img_url);
        if (result) {
          success = true;
          msg = '修改成功！';
        }
      } else {
        msg = "缺少必要参数"
      }
    }
    
		ctx.body = {
			success,
			msg
		}
	}

  // 
   /**
    * @api {delete} /api/goods/:id 删除商品
    * @apiVersion 1.0.0
	  * @apiName delete_goods
    * @apiGroup Goods
    *
    * @apiParam (Request body) {Number} id 商品id （必须）
    *
    * @apiExample {js} Example usage:
    * const data = {
    *   "id": 1
    * }
    *
    * $http.defaults.headers.common["Authorization"] = token;
    * $http.post(url, data)
    *   .success((res, status) => doSomethingHere())
    *   .error((err, status) => doSomethingHere());
    *
    * @apiSuccessExample {json} Success response:
    *     HTTPS 200 OK
    {
      "success": true,
      "msg": "删除成功！"
    }
	  *
    */
	static async removeGoods(ctx) {
		const id = ctx.params.id;

		await goodsModel.removeGoods(id);

		ctx.body = {
			success: true,
			msg: '删除成功！'
		}
	}
}

module.exports = goodsController
