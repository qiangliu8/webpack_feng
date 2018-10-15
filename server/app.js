var path = require('path')
var express = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var compression = require('compression')

var app = express()

app.set('views', path.join(__dirname, '../dist'))
app.set('view engine', 'html')
// remove x-powered-by mark
app.disable('x-powered-by')
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

app.use(express.static(path.join(__dirname, '../dist'), {
  dotfiles: 'ignore',
  etag: false,
  index: false,
  maxAge: '1y',
  redirect: false
}))

app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app