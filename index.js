const express = require('express');
const app = express();
const path = require('path');
const csrf = require('csurf');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const helmet = require ('helmet')
const PORT = process.env.PORT || 3000;
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session') (session)
const homeRoutes = require('./routes/home');
const cartRoutes = require('./routes/cart');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const ordersRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile')
const varMiddleware = require('./middleware/variables');
const errorHandler = require('./middleware/error')
const userMiddleware = require('./middleware/user');
const fileMiddleware = require('./middleware/file')
const keys = require('./keys');
const { use } = require('./routes/profile');

const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: 'hbs',
	helpers: require('./utils/hbs-helpers')
})
const store = new MongoStore({
	collection: 'sessions',
	uri: keys.MONGODB_URI

})

app.use(express.static(path.join(__dirname,'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(express.urlencoded({extended: true}))
app.use(session({
	secret: keys.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	store
}))
app.use(fileMiddleware.single('avatar'))
app.use(csrf())
app.use(flash())
app.use(helmet())
app.use(varMiddleware)
app.use(userMiddleware)

app.use('/',homeRoutes)

app.use('/add',addRoutes)
app.use('/courses',coursesRoutes)
app.use('/cart', cartRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views','views')

app.use(errorHandler)


async function start(){
	try{
		await mongoose.connect(keys.MONGODB_URI, {
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

