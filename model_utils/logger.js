const theDatabase = require('../db.js').theDb;
const loggerSchema = theDatabase.import('../schema/logger.js');

// 根据分页获取数据
const getList = async function (pageIndex, pageSize) {
    return await loggerSchema.findAndCount({
        offset:pageIndex * pageSize,
        limit: pageSize
    }); // findAndCount() 用 get 路由访问，会得到 204 状态：无数据返回。改用 post 就行
}

// add logger
const add = async (desc, time, user_agent, req_body, typeError, url) => {
    await loggerSchema.sync() // 如果是第一次的话，不要映射一下，添加表
    await loggerSchema.create({
        desc,
        time,
        user_agent,
        req_body,
        typeError,
        url
    });

    return true;
}

// 根据商品 id 删除数据
const removeLogger = async (id) => {
    await loggerSchema.destroy({
      where: {
        id
      }
    });
  
    return true;
}

module.exports = {
    add,
    getList,
    removeLogger
}
