const express = require('express');
const ejs = require('ejs');



const app = new express();

const expressSession = require('express-session');


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
const logoutController = require('./controllers/logout')

const validateMiddleWare = require('./middlewares/validationMiddleware')
const authMiddleWare = require('./middlewares/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middlewares/redirectIfAuthenticatedMiddleware')

app.set('view engine', 'ejs');

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const fileUpload = require('express-fileupload')
app.use(fileUpload())


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })



app.use(expressSession({
    secret: 'keyboard cat'
}))


app.use(express.static('public'));

app.listen(4000, () => {
    console.log('App listening on port 4000')
})

global.loggedIn = null;

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
})

app.get('/', homeController);

app.get('/about', aboutController)

app.get('/contact', contactControler)

app.get('/post/:id', getPostController)

app.get('/posts/new', authMiddleWare, newPostController)

app.post('/posts/store', authMiddleWare, validateMiddleWare, storePostController)

app.get('/auth/register', redirectIfAuthenticatedMiddleware, registerController)

app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

app.get('/auth/logout', logoutController)

app.use((req, res) => {
    res.render('404')
})