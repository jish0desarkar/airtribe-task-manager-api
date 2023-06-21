const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const host = "0.0.0.0"

app.use(express.json())

// Mounting tasks
const taskRouter = require('./routes/tasks')
app.use('/tasks', taskRouter)

app.listen(port, host, () => console.log(`Server started! listening on port ${port}!`))