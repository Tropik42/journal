const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')
const routes = require('./routes')

//middleware
app.use(cors())
app.use(express.json())

//TODOS
app.use('/todos', routes.todos)
//TYPES
app.use('/types', routes.types)
//LISTS
app.use('/lists', routes.lists)
//LINKS
app.use('/links', routes.links)

app.listen(3000, () => {
    console.log('Listening on 3000')    
})