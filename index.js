const express = require('express');
const ejs = require('ejs');

const app = new express();
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home.js')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const contactControler = require('./controllers/contact')
const aboutController = require('./controllers/about')
const registerController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginUserController = require('./controllers/loginUser')
const loginController = require('./controllers/login')


const validateMiddleWare = require('./middlewares/validationMiddleware')

app.set('view engine', 'ejs');

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const fileUpload = require('express-fileupload')
app.use(fileUpload())


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })



app.use(express.static('public'));

app.listen(4000, () => {
    console.log('App listening on port 4000')
})

app.get('/', homeController);

app.get('/about', aboutController)

app.get('/contact', contactControler)

app.get('/post/:id', getPostController)

app.get('/posts/new', newPostController)

app.post('/posts/store', validateMiddleWare, storePostController)

app.get('/auth/register', registerController)

app.post('/users/register', storeUserController)

app.get('/auth/login', loginController)
app.post('/users/login', loginUserController)   