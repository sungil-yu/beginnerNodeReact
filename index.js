const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const config = require('./config/key')
const { User } = require('./models/User');


app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

mongoose.connect(uri=config.mongoURI)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!12312')
})

app.post('/register', async (req, res) => {

  try {
    const user = new User(req.body)
    const savedUser = await user.save()
    res.status(200).json({
      success: true,
      user: savedUser
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.errmsg
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


