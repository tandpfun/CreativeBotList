/**
 * Created by orel- on 15/May/17.
 */

// FileSync
var fs = require('fs');
let data = JSON.parse(fs.readFileSync("userdata.json"));

const express = require('express');
const fetch = require('node-fetch');
const btoa = require('btoa');
const { catchAsync } = require('../utils');

const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const redirect = encodeURIComponent('http://localhost:50451/api/discord/callback');

router.get('/login', (req, res) => {
  res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`);
});

router.get('/callback', catchAsync(async (req, res) => {
  if (!req.query.code) throw new Error('NoCodeProvided');
  const code = req.query.code;
  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${creds}`,
      },
    });
  const json = await response.json();
  const userinfo = await fetch(`http://discordapp.com/api/users/@me`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${json.access_token}`,
      },
    });
    const json2 = await userinfo.json();
    res.cookie('access_token', json.access_token, {
      maxAge: json.expires_in*1000
    })
  res.redirect(`/?name=${json2.username}?id=${json2.id}?token=${json.access_token}`);

  console.log(json)
  console.log(json2)
  data.username[json.access_token] = json2.username;
  data.id[json.access_token] = json2.id;
  fs.writeFileSync("userdata.json", JSON.stringify(data));
}));
module.exports = router;
