const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.user,
        pass: process.env.pass
    }
});

let mailOptions = {
    from: 'testing.yisus@gmail.com',
    to: 'sergio@cajasmg.com, alejandro@cajasmg.com',
    subject: 'Funciona C:',
    text: 'Si funciona ✨🎉'
}

transporter.sendMail(mailOptions, function(err, data){
    if(err){
        console.log('An error has ocurred! :c')
    } else {
        console.log('Email has sent successfully!! c:')
    }
})