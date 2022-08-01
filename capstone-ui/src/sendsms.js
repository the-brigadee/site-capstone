require("dotenv").config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const sendsms=()=>{
client.messages
  .create({
     body: 'Hello :D',
     from: '+12058460221',
     to: '+17869717888'
   }); 
}

export default sendsms;