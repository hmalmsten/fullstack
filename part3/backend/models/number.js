const mongoose = require("mongoose")
const url = process.env.MONGODB_URI

mongoose.connect(url)
	.then(result => {
		console.log("connected to MongoDB")
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message)
	})

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

numberSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model("Number", numberSchema)
