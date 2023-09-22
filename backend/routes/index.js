const router = require('express').Router();

const cardsRouter = require('./cards');
const usersRouter = require('./users');
const signupRouter = require('./signup');
const signinRouter = require('./signin');

const auth = require('../middlewares/auth');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('/signin', signinRouter);
router.use('/signup', signupRouter);
router.use(auth);
router.use('/cards', cardsRouter);
router.use('/users', usersRouter);

module.exports = router;
