module.exports = {
    jwtSecret: 'burgess123', // 秘钥
    tokenExpiresTime: 1000 * 60 * 60 * 2, // 过期时间为两个小时
    mail: {
        mail_subject: 'node-server 到干活的时候了~', // 邮箱标题
        from: '"Fred Foo 👻" 1640644790@qq.com',
        to: ["1640644790@qq.com"], // 要发送给哪些邮箱
        host: "smtp.qq.com", // 邮箱服务器
        user: '1640644790@qq.com', // 要登录邮箱的账号
        port: 25, // 邮箱服务器端口，qq邮箱是25
        pass: 'szgutumvidqxeehi' // 如果是腾讯邮箱，这里填写的不是登录邮箱密码，而是授权码
    },
    use_email: true, // 是否报错发送邮件
    logger: true, // 是否进行错误统计功能
}