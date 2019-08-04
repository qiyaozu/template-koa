const config = require('./config')
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
function main(text, url, req_body){
  let transporter = nodemailer.createTransport({
    host: config.mail.host,
    port: config.mail.port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.mail.user, // generated ethereal user
      pass:  config.mail.pass// generated ethereal password
    }
  });

  // send mail with defined transport object
  return transporter.sendMail({
    from: config.mail.from, // sender address
    to: config.mail.to, // list of receivers
    subject: config.mail.mail_subject, // Subject line
    // text: text + '\n' + , // plain text body
    html: `<h3>url:</h3> 
    <p>${url}</p>
    <h3>request body:</h3> 
    <p>${req_body}</p>
    <h3>ERROR:</h3> 
    <p>${text}</p>
    ` // html body
  });
}

// 使用
// (async () => {
//   await main('asfjlafjl')
// })()

module.exports = {
  main: main
}