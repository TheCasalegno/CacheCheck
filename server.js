const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static('views'));

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

const cachePage = require('./routes/cache/page')
const newCache = require('./routes/dash/new')

app.use("/cache", cachePage)
app.use("/dash/new", newCache)

app.listen(3000)