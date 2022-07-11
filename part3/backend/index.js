const express = require("express")
const morgan = require("morgan")
const app = express()
const cors = require("cors")
require("dotenv").config()
const Number = require("./models/number")


app.use(cors())

morgan.token("body", function (req) {
	if (req.method === "POST") {
		return JSON.stringify(req.body)
	}
	else return ""
})
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))
app.use(express.static("build"))

app.get("/", (request, response) => {
	response.send("<h1>Hello World!</h1>")
})

app.get("/info", (response) => {
	res = "<p>Phone book has info of " + Number.length + " people</p><p>" + new Date() + "</p>"
	response.send(res)
})

app.get("/api/persons", (request, response) => {
	Number.find({}).then(persons => {
		response.json(persons)
	})
})

app.get("/api/persons/:id", (request, response, next) => {
	Number.findById(request.params.id)
		.then(number => {
			if (number) {
				response.json(number)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.post("/api/persons", (request, response, next) => {
	const body = request.body


	Number.find({ "name": body.name }).then(find => {

		if (find.length > 0) {
			return response.status(400).json({ error: "name already registered" })
		} else {

			const person = new Number({
				name: body.name,
				number: body.number,
			})
			person.save().then(result => {
				response.json(result)
			}).catch(error => next(error))}
	})
})

app.delete("/api/persons/:id", (request, response, next) => {
	Number.findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
	const { name, number } = request.body

	Number.findByIdAndUpdate(
		request.params.id,
		{ name, number },
		{ new: true, runValidators: true, context: "query" }
	)
		.then(updatedNumber => {
			response.json(updatedNumber)
		})
		.catch(error => next(error))
})



const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" })
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

app.use(errorHandler)