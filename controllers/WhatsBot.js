
require('dotenv').config();
const twilio = require('twilio');
const SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH = process.env.TWILIO_AUTH_TOKEN;

twilio(SID, AUTH);

const sendSMS = (to, body) => {
  const client = new twilio(SID, AUTH)
  return new Promise((resolve, reject) => {
    client.messages.create({
      to,
      from: process.env.AdminNumber,
      body
    }, (error, message) => {
      if(error){
        reject(error)
      } else {
        resolve({to, body})
      }
    })
  })
}

module.exports = {
  sendSMS
}