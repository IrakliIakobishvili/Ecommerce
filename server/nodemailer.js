const nodemailer = require("nodemailer");
const { EMAIL_PASS } = require("./configuration");

module.exports.sendMail = function(url, userEmail, userName, token) {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "noreply.burgerhub@gmail.com",
      pass: EMAIL_PASS
    }
  });
  let mailOptions = {
    from: "BurgerHub <noreply.burgerhub@gmail.com>",
    to: `${userEmail}`,
    subject: `Confirmation Email - BurgerHub.com`,
    html: `
        <div style='width: 750px;box-sizing: border-box;padding: 115px 90px;display: flex;align-items: center;justify-content: center;background: #F3F3F3;font-family: verdana;text-align: center;'>
            <div style='width: 550px;box-shadow: 0px 1px 2px 2px #E9E9E9;border-radius: 4px;overflow: hidden;background: #fff;justify-content: center; border: 1px solid #d62231;'>
                <header style='background: #d62231;padding: 55px 0px;text-align: center;font-size: 50px;font-weight: bold;color: #fff;'>Burger Hub</header>
                <h1 style='color: #4c4c4c;font-weight: normal;font-size: 30px;margin: 24px 0px;'>Email Confirmation</h1>
                <p style='margin: 0px;padding: 0px;font-size: 14px;line-height: 22px;color: #717171;margin-bottom: 20px;'>Hey ${userName}, you're almost ready to start enjoying Burger Hub.<br>
                Simply click the big yellow button below to verify your<br>
                email address.</p>
                <a style='background: #FFB200;color: #fff;padding: 15px 20px;display: inline-block;border-radius: 3px;text-decoration: none;font-size: 15px;margin-bottom: 30px;' href='${url}/verify/${token}'>Verify email address</a>
            </div>
        </div>`
  };
  return new Promise(function(resolve, reject) {
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};
