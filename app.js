// const dotenv = require('dotenv')
const {google} = require('googleapis');
const path = require('path');
const fs = require('fs')

// import .env variables
// dotenv.config({path: "./config.env"});

const REFRESH_TOKEN = '1//04SR5ECj5F9HpCgYIARAAGAQSNwF-L9IrPfBaFK5Cp0v3_u6-aszWapLp1cg0EavVu7ftRSCm2Mslsnneacrg6RTnuCXKUgeSkD8'

const folderId = '16Um1wclmHp1-X_NoZxHcUVoCK8MsinW3'


const clientId = '972214866228-2sp399rvhtnsqjds1fundtd6qiakm7o5.apps.googleusercontent.com';
const clientSecret = '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';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground'

const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    REDIRECT_URL
);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

// file name with iso data
const todayDate = new Date().toISOString().slice(0, 10);


const filePath = path.join('../../../Documents', `${todayDate}.json`);

async function uploadFile() {
    try {
        
         const response = await drive.files.create({
             requestBody: {
                 name: `${todayDate}.json`,
                 mimeType: 'application/json',
                 parents: [folderId]
             },
             media: {
                 mimeType: 'application/json',
                 body: fs.createReadStream(filePath)
             }
         })

         console.log(response.data);

    } catch (error) {
        console.log(error);
    }
}

uploadFile()