const {body} = require('express-validator')
const e = require('express')
const User = require('../models/user')

exports.registerValidators =[
	body('email').isEmail()
	.withMessage('Введите корректный email')
	.custom(async (value,{req}) => {
		try{
			const user = await User.findOne({email: value})
			if(user){
				return Promise.reject('Такой email уже занят')
			}
		} catch (e) { console.log(e)}

	})
	.normalizeEmail(),

	body('password', 'Пароль должен быть минимум 6 символов')
	.isLength({min: 6, max: 56})
	.isAlphanumeric()
	.trim(),

	body('confirm')
	.custom((value, {req}) => {
		if(value !== req.body.password) {
			throw new Error('Пароль должен совпадать')
		} 
		return true
	})
	.trim(),

	body('name').isLength({min:3})
	.withMessage('Имя должно быть минимум 3 символа')
	.trim()
]

exports.loginValidators = [
	body('email').isEmail()
	.withMessage('Введите корректный email')
	.custom(async (value,{req}) => {
		try{
			const user = await User.findOne({email: value})
			if(user){
				return Promise.reject('Такой email уже занят')
			}
		} catch (e) { console.log(e)}

	})
	.normalizeEmail(),

	body('password', 'Пароль должен быть минимум 6 символов')
	.isLength({min: 6, max: 56})
	.isAlphanumeric()
	.trim(),
]

exports.courseValidators = [
	body('title').isLength({min: 3}).withMessage('Минимальное название 3 символа'),
	body('price').isNumeric().withMessage('Введите корркектную цену'),
	body('img', 'Введите корректный url').isURL()
]