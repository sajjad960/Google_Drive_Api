const dotenv = require('dotenv')
const {google} = require('googleapis');
const path = require('path');
const fs = require('fs')

// import .env variables
dotenv.config({path: "./config.env"});

const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const FOLDER_ID = process.env.MY_DRIVE_FOLDER;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL= process.env.REDIRECT_URL;


const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

// file name with iso date
const todayDate = new Date().toISOString().slice(0, 10);

// const filePath = path.join('../../../Documents', `${todayDate}.json`);

//testing
const filePath = path.join(__dirname, 'uploadChecking.txt');

async function uploadFile() {
    try {
        
         const response = await drive.files.create({
             requestBody: {
                //  name: `${todayDate}.json`,
                 name: `uploadChecking.txt`,
                 mimeType: 'application/json',
                 parents: [FOLDER_ID]
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