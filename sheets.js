const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

const {
    applicationID, adminAPIKey, index_name
} = process.env;

const algoliasearch = require("algoliasearch");

const client = algoliasearch(`${applicationID}`, `${adminAPIKey}`);
const index = client.initIndex(`${index_name}`);


const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');

const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

const spreadsheetId = '1xYNvFOMwinKl0bX55J9AOYhLc7Y1Gm-WnMBLUgYw_X8';
const range = 'Буевичи (Поселенные 1926 г.)!A10:Q';

async function listMajors(auth) {

    const sheets = google.sheets({version: 'v4', auth});

    const res = await sheets.spreadsheets.values.get({spreadsheetId, range});
    const rows = res.data.values;
    if (!rows || rows.length === 0) {
        console.log('No data found.');
    }

    const resList = [];
    rows.forEach((row, rowIndex) => {
        const [delo, page, nmbList, okrug, raion, selsovet, place, nmb, fio, , , nationality, m, f, total, notes] = row;
        resList.push({delo, page, nmbList, okrug, raion, selsovet, place, nmb, fio, nationality, m, f, total, notes});
    });

    return await Promise.all(resList);
}

authorize().then(listMajors).then((result) => {

    index
        .clearObjects()
        .saveObjects(result, {autoGenerateObjectIDIfNotExist: true}).then(({objectIDs}) => {
            console.log('objectIDs', objectIDs.length);
            console.log('result', result.length);
            fs.writeFile(`./__censusIndex.js`, `module.exports = ${JSON.stringify(result)}`, {encoding: 'utf8', flag: 'w'});
    }).catch((e) => console.log('catch-2', e));

}).catch((e) => console.log('catch-3', e));