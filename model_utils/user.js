const theDatabase = require('../db.js').theDb;
const userSchema = theDatabase.import('../schema/user.js');

// 通过用户名查找
const getUserByName = async function(name) {
  const userInfo = await userSchema.findOne({
    where: {
      user_name: name
    }
  })

  return userInfo
}

// 通过用户 id 查找
const getUserById = async function(id) {
  const userInfo = await userSchema.findOne({
    where: {
      id: id
    }
  });

  return userInfo
}

const getUserList = async function() {
  return await userSchema.findAndCount(); // findAndCount() 用 get 路由访问，会得到 204 状态：无数据返回。改用 post 就行
}

// 用户注册
const register = async (user_name, password, mobile) => {
  // 删除表再重新创建
  // await userSchema.sync({force: true})
  const result = await userSchema.create({
    user_name,
    password,
    mobile
  });
		
  console.log('result++++++++++++++++++++++++++++', result)

  return true;
}

module.exports = {
  getUserByName,
  getUserById,
  getUserList,
  register
}
