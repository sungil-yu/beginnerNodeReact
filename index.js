const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');


app.use(bodyParser.urlencoded({ extended: true}))
app.use(cookieParser())
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
    await user.save() 
    res.status(200).json({
      success: true
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.errmsg
    })
  }
})

app.post('/login', (req, res) => {
  User.findOne({ email: req.body.email })
  .then( user => {
    if(!user) return res.json({
      loginSuccess: false,
      message : "유저가 없습니다."
    });

    user.comparePassword( req.body.password, (err, isMatch) => {
      if(!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."});

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('x_auth', user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id})
      })
    })
  }).catch( err => {
    console.err(err)
  })

})

app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


