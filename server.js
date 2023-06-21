const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

// Mounting tasks
const taskRouter = require('./routes/tasks')
app.use('/tasks', taskRouter)

app.listen(port, () => console.log(`Server started! listening on port ${port}!`))