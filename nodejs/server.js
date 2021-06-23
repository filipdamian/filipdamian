if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const fs=require('fs')


const initializePassport = require('./passport-config')
  ///static files
  app.use(express.static('public'))
  app.use('/css',express.static(__dirname + 'public/css'))
  app.use('/js',express.static(__dirname + 'public/js'))
  app.use('/media',express.static(__dirname + 'public/media'))
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


app.get('/shop', checkAuthenticated, (req, res) => {
  fs.readFile('items.json',function(error,data){
    if(error)
    {
      res.status(500).end()
    }else{
      res.render('logout.ejs',{items: JSON.parse(data)})
    }
  })
 // res.render('logout.ejs', { name: req.user.name })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  fs.readFile('items.json',function(error,data){
    if(error)
    {
      res.status(500).end()
    }else{
      res.render('login.ejs',{items: JSON.parse(data)})
    }
  })
 // res.render('login.ejs')
})
app.get('/index', (req, res) => {
  res.render('index.ejs')
})
app.get('/404', (req, res) => {
  res.render('404.ejs')
})
app.get('/saltwater', (req, res) => {
  res.render('saltwater.ejs')
})
app.get('/freshwater', (req, res) => {
  res.render('freshwater.ejs')
  console.log()
})
app.get('/accessories', (req, res) => {
  res.render('accessories.ejs')
  console.log()
})



app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/shop',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})



app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}
app.get('*', (req, res) => {
  res.redirect('/404')
})

app.listen(3000,function(error){
  if(error){
     res.render('404.ejs')
  }
})

 