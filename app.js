const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const dotenv = require('dotenv')

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID; 
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID, 
    CLIENT_SECRET, 
    REDIRECT_URI
    );



oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

async function sendMail(){

    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type:'oAuth2',
                user: process.env.user,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refresh_token: REFRESH_TOKEN,
                accessToken: accessToken
            },
        });

        const mailOptions = {
            from: 'Yisus 🎫 <testing@gmail.com>',
            to: 'testing@gmail.com, testing@gmail.com',
            subject: 'Test Email from GMAIL API',
            text: 'Hola desde gmail usando su api C:',
            html: '<h1>Hola desde gmail usando su api C:<h1>'
        };

        const result =  await transport.sendMail(mailOptions);

        return result;
    } catch (error) {
    
        return error;
    }
}

sendMail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message));