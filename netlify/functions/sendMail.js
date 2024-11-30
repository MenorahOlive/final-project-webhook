const dotenv = require('dotenv');
const axios = require("axios")

exports.handler = async (event, context) => {
    try {
        const resp = await axios.post(
            'https://api.mailersend.com/v1/email',
            {
              from: {
                email: 'info@trial-z3m5jgrw6ymldpyo.mlsender.net'
              },
              to: [
                {
                  email: 'abdul.r.zaid@gmail.com'
                }
              ],
              subject: 'Your grandma is broken',
              text: 'Greetings, your grandma dead. She fell.',
              html: 'Greetings, your grandma dead. She fell.'
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: `Bearer ${process.env.MAILER_SEND_API_KEY}`
              }
            }
          )
          return {
            statusCode: 200,
            body: JSON.stringify({ message: "Mail sent successfully", }),
          };
      } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to send mail" }),
          };
      }
    
  };
  