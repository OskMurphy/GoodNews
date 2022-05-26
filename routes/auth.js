const bcrypt = require('bcrypt');

const router = require('express').Router();

const { User } = require('../db/models');

router.get('/signup', (req, res) => {
  res.render('entries/signup');
});

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    console.log('зашёл в try');
    const hashpassword = await bcrypt.hash(password, 10);
    console.log('создаю юзера');
    const user = await User.create({ name, email, password: hashpassword });
    console.log('создал юзера');
    req.session.user = {
      id: user.id,
      name: user.name,
    };
    // res.render('entries/mainPage');
    res.redirect('/');
  } catch (err) {
    console.log('error', err);
  }
});

router.get('/signin', async (req, res) => {
  res.render('entries/login');
});

router.post('/signin', async (req, res) => {
  const { name, password } = req.body;
  try {
    console.log('зашёл в трай');
    const user = await User.findOne({ where: { name } });
    console.log('Нашёл юзера');
    if (!user) {
      return res.render('entries/notlogin');
    }
    console.error('login not found');
    const pass = await bcrypt.compare(password, user.password);
    if (!pass) {
      return res.render('entries/notlogin');
    }
    console.error('Password not found');
    req.session.user = {
      id: user.id,
      name: user.name,
    };
    // res.render('entries/mainPage');
    res.redirect('/');
  } catch (err) {
    console.log('error', err);
    return res.render('entries/catch');
  }
});

router.get('/logout', async (req, res) => {
  req.session.destroy();
  res.clearCookie('cookieGoodNews');
  res.redirect('/');
});

module.exports = router;
