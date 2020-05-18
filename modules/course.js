const uuid = require('uuid').v4;
const fs = require('fs');
const path = require('path');

class Course {
	constructor(title, price, image){
		this.title = title;
		this.price = price;
		this.image = image;
		this.id = uuid();

	}
	
	async save(){
		const courses = await Course.getAll()
		console.log('Courses', courses)
	}

	static getAll() {
		return new Promise((resolve, reject) => {
			fs.readFile(
				path.join(__dirname, '..', 'data', 'courses.json'),
				'utf-8',
				(err,content) => {
					if (err) {
						reject(err)
					} else{
						resolve(JSON.parse(content))
					}
				}
			)
		})
		
	}
}

 module.exports = Course