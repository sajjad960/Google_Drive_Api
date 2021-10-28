const dotenv = require('dotenv')
const {google} = require('googleapis');
const path = require('path');
const fs = require('fs')

// import .env variables
dotenv.config({path: "./config.env"});

const REFRESH_TOKEN = '1//04HkkOBmbDq2ZCgYIARAAGAQSNwF-L9IrY6lzG6v_vByQ_M4jUgrMrDRqYzi793Xoq649Fhuf7hYNg1Cno7kPGz0wvxHjzmI_Rag'

const folderId = '16Um1wclmHp1-X_NoZxHcUVoCK8MsinW3'

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
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