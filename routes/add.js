const {Router} = require('express');
const router = Router();
const Course = require("../modules/course")

router.get('/',(req,res) =>{
	res.render('add', {
		title: 'добавить Курсы',
		isAdd: true
	})
})

router.post('/', (req,res) => {
	const course = new Course(req.body.title, req.body.price, req.body.image)
	course.save();
	res.redirect('/courses')
})

module.exports = router