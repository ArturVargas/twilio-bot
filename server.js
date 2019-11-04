

const express = require('express');
const cors = require('cors');


const app = express();
const PORT = 3000 || process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const {sendSMS} = require('./controllers/WhatsBot');

app.get('/', (req, res) => {
  res.send('Server Runs!!');
});

app.post('/sms', (req, res) => {
  const params = req.body
  sendSMS(params.num, params.message)
    .then(data => {
      res.status(201).json({data})
    })
    .catch(error => {
      res.status(400).json({error})
    })
})

app.post('/api/v1/incoming', (req, res) => {
  console.log(req.body);
  return res.status(200).json({message:'Su cita esta en la sala de espera!!'});
});

app.listen(PORT, () => {
  console.log(`App corriendo en ${PORT}`);
});

module.exports = app;