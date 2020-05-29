const {Router} = require('express')
const router = Router()
const Cart = require('../modules/cart')
const Course = require('../modules/course')


router.post('/add', async (req,res) =>{
	const course = await Course.getById(req.body.id)
	await Cart.add(course)
	res.redirect('/cart')
})

router.get('/', async (req,res) =>{
	const cart = await Cart.fetch()
	res.render('cart',{
		title: 'Корзина',
		cart
	})
})

module.exports = router