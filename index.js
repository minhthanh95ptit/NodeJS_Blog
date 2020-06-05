const express = require('express');
const path = require('path');
const app = new express();

const ejs = require('ejs');
app.set('view engine', 'ejs');

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const fileUpload = require('express-fileupload')
app.use(fileUpload())


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

const BlogPost = require('./models/BlogPost.js');



app.use(express.static('public'));

app.listen(4000, () => {
    console.log('App listening on port 4000')
})


const validateMiddleWare = (req, res, next) => {
    if (req.files == null || req.body.title == null || req.body.title == null) {
        return res.redirect('/posts/new')
    }
    next()
}

app.use('/posts/store', validateMiddleWare)

app.get('/', (req, res) => {
    BlogPost.find({}, function (error, posts) {
        res.render('index', {
            blogposts: posts
        })
    });
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/post/:id', (req, res) => {
    BlogPost.findById(req.params.id, function (error, detailPost) {
        res.render('post', {
            detailPost
        })
    })
})

app.get('/posts/new', (req, res) => {
    res.render('create');
})

app.post('/posts/store', (req, res) => {
    let image = req.files.image;
    console.log(image);
    image.mv(path.resolve(__dirname, 'public/upload', image.name), function (err) {
        BlogPost.create({
            ...req.body,
            image: '/upload/' + image.name
        }, function (err) {
            res.redirect('/')
        })
    })


})