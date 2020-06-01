const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000;
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const cartRoutes = require('./routes/cart')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: 'hbs'
})

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended: true}))
app.use('/',homeRoutes)
app.use('/add',addRoutes)
app.use('/courses',coursesRoutes)
app.use('/cart', cartRoutes)

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views','views')

async function start(){
	try{
		const url = 'mongodb://localhost:27017/shop'
		await mongoose.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		})
		app.listen(PORT, () => {
		console.log(`Server started...${PORT}`)
		})
	} catch (e){
		console.log(e)
	}

}
start()

