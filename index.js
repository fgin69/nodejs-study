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
const User = require('./models/user')
const ordersRoutes = require('./routes/orders')
const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: 'hbs'
})

app.use(async ( req,res, next) => {
	try{
	const user = await User.findById('5eda3d5fe3f64831e4ff1466')
	req.user = user
	next()
	} catch (e) {
		console.log(e)
	}
})

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended: true}))
app.use('/',homeRoutes)
app.use('/add',addRoutes)
app.use('/courses',coursesRoutes)
app.use('/cart', cartRoutes)
app.use('/orders', ordersRoutes)
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
		const candidate = await User.findOne()
		if (!candidate) {
			const user = new User({
				email: 'Nikitalox@gmail.com',
				name: 'Nikitalox',
				cart: {items: []}
			})
			await user.save()
		}
		app.listen(PORT, () => {
		console.log(`Server started...${PORT}`)
		})
	} catch (e){
		console.log(e)
	}

}
start()

