const express = require('express');
const path = require('path');
const app = new express();

const ejs = require('ejs');
app.set('view engine', 'ejs');

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

const BlogPost = require('./models/BlogPost.js');


app.use(express.static('public'));

app.listen(4000, () => {
    console.log('App listening on port 4000')
})


app.get('/', (req, res) => {
    BlogPost.find({}, function (error, posts) {
        console.log(posts);
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
    console.log(req.body);

    BlogPost.create(req.body, (error, blogpost) => {
        res.redirect('/');
    })
})