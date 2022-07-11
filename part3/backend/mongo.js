const { response } = require("express")
const mongoose = require("mongoose")

if (process.argv.length < 3) {
	console.log("Please provide the password as an argument: node mongo.js <password>")
	process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const url =
  `mongodb+srv://herman:${password}@cluster0.v6q78.mongodb.net/?retryWrites=true&w=majority`


mongoose.connect(url).then((response) => {

	const numberSchema = new mongoose.Schema({
		name:{
			type: String,
			minLength: 3,
			required: true
		},
		number: {
			type: String,
			validate: {
				validator: function(v) {
					return /[0-9]{2,3}-[0-9]*/.test(v)
				}
			},
			minLength: 8,
			required: true
		},
	})

	const Person = mongoose.model("Person", numberSchema)

	if (name && number) {

		const person = new Person({
			name: name,
			number: number,
		})

		person.save().then(result => {
			console.log("number saved!")
			mongoose.connection.close()
		})
	} else {
		console.log("phonebook:")
		Person
			.find({})
			.then(persons => {
				persons.forEach(person =>
					console.log(person.name, person.number)
				)
				mongoose.connection.close()
			})
	}
})