const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('entries/mainPage');
});

router.post('/word', (req,res) => {
  try {
    res.status(200).send()
  } catch (err) {
    res.status(500).send()
  }
})


module.exports = router;
