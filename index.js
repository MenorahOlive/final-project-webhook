const express = require('express');
const dotenv = require('dotenv');
const axios = require("axios")


dotenv.config();

const app = express();
app.use(express.json()); 
const PORT = 3000;

const servicePassword = process.env.SERVICE_PASSWORD

app.post('/', async (req, res) => {

    console.log(req.body);
    

    const password = req.body?.password

    if(password !== servicePassword) {
       return res.status(401).send("Unauthorized")
    }


  try {
    const resp = axios.post(
        'https://api.mailersend.com/v1/email',
        {
          from: {
            email: 'info@trial-z3m5jgrw6ymldpyo.mlsender.net'
          },
          to: [
            {
              email: 'olivemenorah@gmail.com'
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

      

    return res.send('Email sent successfully');
  } catch (err) {
    console.error('Failed to send email:', err);
    return res.status(400).json({ error: 'Failed to send email' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
