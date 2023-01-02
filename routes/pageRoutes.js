
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('Request for home recieved');
  res.render('index');
});

router.get('/commercial', (req, res) => {
  res.render('commercial');
});

router.get('/residential', (req, res) => {
  res.render('residential');
});

router.get('/quote', (req, res) => {
  res.render('quote');
});


module.exports = router;