const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connect to database"))
.catch(console.error)

const Todo = require('./models/Todo')

app.get('/todos', async (req, res) => {
    const todos = await Todo.find()

    res.json(todos)
})


app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text

    })

    todo.save()

    res.json(todo)
})

app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id)
    res.json(result)
})

app.get('/todo/completed/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    todo.completed = !todo.completed

    todo.save()

    res.json(todo)
})

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on port ${port}...`))
