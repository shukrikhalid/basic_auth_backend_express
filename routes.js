// const ArticleController  = require('./controllers/ArticleController');
const AuthController  = require('./controllers/auth-controller');
const UserController  = require('./controllers/user-controller');


routers = (route) => {
  route.post('/auth/signup', AuthController.signup)
  route.post('/auth/login', AuthController.login)

  route.get('/user', UserController.list)
  // route.get('/user/:id', UserController.show)
  

  //The 404 Route (ALWAYS Keep this as the last route)
  route.all('*', function (req, res) {
    res.status(404).json({
          error: `Not Found Method: ${req.method}, Route :'${req.url}'`
    });
  });

  // error-handling middleware functions
  route.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).json({
      error: "Internal Server Error" 
    });
  })
}

module.exports = routers