const validator = require("validator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const cleanUpAndValidate = ({ name, email, username, password, phone }) => {
  return new Promise((resolve, reject) => {
    if (typeof email != "string") reject("Invalid Email");
    if (typeof name != "string") reject("Invalid name");
    if (typeof password != "string") reject("Invalid Password");
    if (typeof username != "string") reject("Invalid username");

    if (!email || !password || !username) reject("Invalid Data");

    if (!validator.isEmail(email)) reject("Invalid Email Format");

    if (username.length < 3) reject("Username too short");

    if (username.length > 50) reject("Username too long");

    if (password.length < 5) reject("Password too short");

    if (password.length > 200) reject("Password too long");
    resolve();
  });
};
const jwtSign = (email) => {
  const JWT_TOKEN = jwt.sign({ email: email }, "hiiii", {
    expiresIn: "1d",
  });
  return JWT_TOKEN;
};

const sendVerifcationEmail = (email, verificationToken) => {
  console.log(email, verificationToken);

  let mailer = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "Gmail",
    auth: {
      user: "pg3362474@gmail.com",
      pass: "iakkmtmbyblprnna",
    },
  });

  let sender = "Node app";
  let mailOptions = {
    from: sender,
    to: email,
    subject: "Email Verification for Node App",
    html: `Press <a href=https://registrationnode-production.up.railway.app/verifyEmail/${verificationToken}> Here </a> to verify your account.`,
  };

  mailer.sendMail(mailOptions, function (err, response) {
    if (err) throw err;
    else console.log("Mail has been sent successfully");
  });
};

const send_forget_mail = (email, verificationToken) => {
  let mailer = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "Gmail",
    auth: {
      user: "pg3362474@gmail.com",
      pass: "iakkmtmbyblprnna",
    },
  });

  let sender = "Node app";
  let mailOptions = {
    from: sender,
    to: email,
    subject: "Foget your password",
    html: `Press <a href=https://registrationnode-production.up.railway.app/forgetPassword/${verificationToken}> Here </a> forget password for your account`,
  };

  mailer.sendMail(mailOptions, function (err, response) {
    if (err) throw err;
    else console.log("Mail has been sent successfully");
  });
};

module.exports = {
  cleanUpAndValidate,
  jwtSign,
  sendVerifcationEmail,
  send_forget_mail,
};
