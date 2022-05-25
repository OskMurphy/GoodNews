// const router = require('express').Router();
// const fetch = require('node-fetch');
// const dotenv = require('dotenv').config();

// const API_KEY = process.env.API_KEY || '';

// router.get('/', async (req, res) => {
//   const response = await fetch('https://newsapi.org/v2/everything?q=bitcoin&from=2022-05-23&sortBy=popularity&language=ru&pageSize=10', {
//     headers: {
//       'X-Api-Key': API_KEY,
//     },
//   });
//   const result = await response.json();
//   // console.log(JSON.stringify(result, 0, 2));
//   res.render('entries/index', result);
// });

// module.exports = router;
