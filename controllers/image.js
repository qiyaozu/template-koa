const path = require('path');
const fs = require('fs')

class uploadImgController {
  static async uploadImg (ctx) {
    const file = ctx.request.files.file
    const fileName = Date.now() + '-' + file.name.substring(0, file.name.lastIndexOf('.'))
    const file_extend = file.name.substring(file.name.lastIndexOf('.') + 1)
    
    // 创建读取流
    let fileReadStream = fs.createReadStream(ctx.request.files.file.path)

    const filePath = path.resolve(__dirname, '../uploads')

    // 写入流
    let writerStream = fs.createWriteStream(filePath + '/' + fileName + '.' + file_extend);

    fileReadStream.pipe(writerStream);

    ctx.body = {
      success: true
    };
  }
}

module.exports = uploadImgController
