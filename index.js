const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: 'hbs'
})

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use('/',homeRoutes)
app.use('/add',addRoutes)
app.use('/courses',coursesRoutes)

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views','views')

app.listen(PORT, () => {
	console.log(`Server started...${PORT}`)
})