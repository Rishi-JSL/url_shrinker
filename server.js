const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoConnect = require('./util/database').mongoConnect
const shortId = require('shortid')
const ShrinkUrl = require('./model/shortUrl')

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    const shrinkUrls = await ShrinkUrl.find();
    //console.log("links : "+shortUrls)
    res.render('index', { shrinkUrls : shrinkUrls })
})

app.post('/shortUrls', async (req, res) => {
  const full = req.body.full;
  console.log(full)
    const shrinkUrl = new ShrinkUrl({ full: full, short: shortId.generate() });
    shrinkUrl.save()
      .then( result => {
        console.log("link added to db");
        res.redirect('/');
      })
      .catch( err => {console.log(err)});
})
app.get("/delete/:linkId", (req, res, next) => {
    console.log("rishi kumar jaiswal " +req.params.linkId);
    ShrinkUrl.deleteOne({ _id: req.params.linkId })
      .then( result => {
        console.log("deleted successfully");
        res.redirect('/');
      })
      .catch( err => {console.log(err)});
})

mongoose.connect('mongodb+srv://rishi_jaiswal:JRKUedOjlraCBMlA@cluster0.8lnnm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then( result => {
    console.log("connected")
    app.listen(2000);
  })
  .catch(err => {
    console.log(err)
  })
